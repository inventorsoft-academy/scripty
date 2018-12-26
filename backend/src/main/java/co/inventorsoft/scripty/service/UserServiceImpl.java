package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.*;
import co.inventorsoft.scripty.model.entity.PasswordToken;
import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.model.entity.VerificationToken;
import co.inventorsoft.scripty.repository.PasswordTokenRepository;
import co.inventorsoft.scripty.repository.UserRepository;
import co.inventorsoft.scripty.repository.VerificationTokenRepository;
import com.google.common.io.Files;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.Clock;
import java.time.Instant;
import java.util.*;

/**
 *
 * @author Symyniuk
 *
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private VerificationTokenRepository tokenRepository;
    private PasswordEncoder passwordEncoder;
    private EmailService emailService;
    private PasswordTokenRepository passwordTokenRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           VerificationTokenRepository tokenRepository,
                           PasswordEncoder passwordEncoder,
                           EmailService emailService,
                           PasswordTokenRepository passwordTokenRepository){
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.passwordTokenRepository = passwordTokenRepository;
    }

    public User findByEmail(final String email){
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(!userOptional.isPresent()){
            throw new ApplicationException("Email is not found!", HttpStatus.BAD_REQUEST);
        }
        return userOptional.get();
    }

    public void registerNewUserAccount(final UserDto userDto){
        if(userRepository.findByEmail(userDto.getEmail()).isPresent()){
            throw new ApplicationException("There is an account with that email address: " +  userDto.getEmail(), HttpStatus.BAD_REQUEST);
        }
        final User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPassword(passwordEncoder.encode(userDto.getValidPassword()));
        user.setEmail(userDto.getEmail());
        user.setEnabled(false);
        user.setRole("User");
        userRepository.save(user);
        final String token = UUID.randomUUID().toString();
        createVerificationTokenForUser(user, token);
        emailService.sendEmailWithVerificationLink(user, token);
    }

    public void resendRegistrationToken(final EmailDto emailDto){
        if(!userRepository.findByEmail(emailDto.toString()).isPresent()){
            throw new ApplicationException("Please complete the registration first!", HttpStatus.OK);
        }
        final User user = findByEmail(emailDto.toString());
        final VerificationToken verificationToken = generateNewVerificationToken(user);
        emailService.resendEmailWithVerificationLink(user, verificationToken);
    }

    public void validateVerificationToken(final String token) {
        Optional<VerificationToken> verificationTokenOptional =tokenRepository.findByToken(token);
        if(!verificationTokenOptional.isPresent()){
            throw new ApplicationException("Wrong link", HttpStatus.BAD_REQUEST);
        }
        final VerificationToken verificationToken = verificationTokenOptional.get();
        final User user = verificationToken.getUser();
        final Instant instantExp = verificationToken.getExpiryDate();
        final Instant instant = Clock.systemDefaultZone().instant();
        if ((instantExp.isBefore(instant))) {
            throw new ApplicationException("Time of user verification link has expired", HttpStatus.BAD_REQUEST);
        }
        user.setEnabled(true);
        userRepository.save(user);
        tokenRepository.delete(verificationToken);
    }

    public void setPicture(String email, MultipartFile picture) {
        if (!ImageTypes.contains(Files.getFileExtension(picture.getOriginalFilename()))) throw new ApplicationException("Incorrect file extension", HttpStatus.BAD_REQUEST);
        userRepository.findByEmail(email).ifPresent(u -> {
            try {
                u.setPicture(new PictureDto(Base64.getEncoder().encodeToString(picture.getBytes()), picture.getContentType()));
            } catch (IOException e) {
                throw new ApplicationException("File's empty. Please, try to use another one!", HttpStatus.BAD_REQUEST);
            }
            userRepository.save(u);
        });
    }

    public PictureDto getPicture(Long id) {
        PictureDto image = userRepository.findById(id).flatMap(o_user -> Optional.ofNullable(o_user.getPicture()))
                .map(picture -> new PictureDto(picture.getContent(), picture.getExtension()))
                .orElseThrow(() -> new ApplicationException("Picture not found for user " + id, HttpStatus.NOT_FOUND));
        return image;
    }

    public void updatePassword(String email, UpdatePasswordDto updatePasswordDto) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            if(passwordEncoder.matches(updatePasswordDto.getOldPassword(), user.get().getPassword())) {
                user.get().setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword().getPassword()));
                userRepository.save(user.get());
            } else
                throw new ApplicationException("The password you've entered doesn't match your current one", HttpStatus.BAD_REQUEST);
        } else
            throw new ApplicationException("User not found.", HttpStatus.NOT_FOUND);
    }

    private void createVerificationTokenForUser(final User user, final String token) {
        final VerificationToken myToken = new VerificationToken(token, user);
        tokenRepository.save(myToken);
    }

    private VerificationToken generateNewVerificationToken(final User user) {
        return tokenRepository.findByUser(user)
               .map(token -> token.updateToken(UUID.randomUUID().toString()))
               .map(tokenRepository::save)
               .orElseThrow(()-> new ApplicationException("Token not found", HttpStatus.OK));
    }

    private void createResetPasswordToken(final User user, final String passwordToken){
        Optional<PasswordToken> passwordTokenOptional = passwordTokenRepository.findByUser(user);
        PasswordToken token = passwordTokenOptional.map(passToken -> passToken.updatePasswordToken(passwordToken))
                .orElseGet(() -> new PasswordToken(passwordToken, user));
        passwordTokenRepository.save(token);
    }

    public void sendResetPasswordToken(final EmailDto emailDto){
        Optional<User> userOptional = userRepository.findByEmail(emailDto.getEmail());
        if(userOptional.isPresent()) {
            final User user = userOptional.get();
            final String resetPasswordToken = UUID.randomUUID().toString();
            createResetPasswordToken(user, resetPasswordToken);
            emailService.sendEmailWithResetPasswordToken(user, resetPasswordToken);
        }
    }

    @Override
    public void updateProfile(String email, UpdateUserDto updateDto) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setFirstName(updateDto.getFirstName());
            user.setLastName(updateDto.getLastName());
            userRepository.save(user);
        });
    }

    private void validateResetPasswordToken(final String token){
        Optional<PasswordToken> passwordTokenOptional = passwordTokenRepository.findByPasswordToken(token);
        Instant tokenExpiryDate = passwordTokenOptional.map(passwordToken -> passwordToken.getExpiryDate())
                .orElseThrow(()-> new ApplicationException("Wrong link", HttpStatus.BAD_REQUEST));
        Instant now = Clock.systemDefaultZone().instant();
        if(tokenExpiryDate.isBefore(now)){
            throw new ApplicationException("Your password reset link has expired, please reset your password again", HttpStatus.BAD_REQUEST);
        }
    }

    public void updateForgottenPassword(final String token, final ResetPasswordDto resetPasswordDto){
        final User user = findByEmail(resetPasswordDto.getEmail());
        if(!user.isEnabled()){
            throw new ApplicationException("Please confirm your registration first", HttpStatus.BAD_REQUEST);
        }
        validateResetPasswordToken(token);
        final PasswordToken passwordToken = passwordTokenRepository.findByPasswordToken(token).get();
        user.setPassword(passwordEncoder.encode(resetPasswordDto.getValidPassword()));
        userRepository.save(user);
        passwordTokenRepository.delete(passwordToken);
    }

    @Override
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public Page<User> findByEmailStartsWith(String email, Pageable pageable) {

        return userRepository.findByEmailStartsWith(email, pageable);
    }
}