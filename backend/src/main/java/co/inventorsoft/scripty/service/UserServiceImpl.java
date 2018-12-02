package co.inventorsoft.scripty.service;
import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.EmailDto;
import co.inventorsoft.scripty.model.dto.PasswordDto;
import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.model.entity.VerificationToken;
import co.inventorsoft.scripty.model.dto.UserDto;
import co.inventorsoft.scripty.repository.UserRepository;
import co.inventorsoft.scripty.repository.VerificationTokenRepository;
import javafx.application.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    private VerificationTokenRepository tokenRepository;
    private PasswordEncoder passwordEncoder;
    private EmailService emailService;
    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           VerificationTokenRepository tokenRepository,
                           PasswordEncoder passwordEncoder,
                           EmailService emailService){
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
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
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
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
        Instant instantExp = verificationToken.getExpiryDate();
        final Instant instant = Clock.systemDefaultZone().instant();
        if ((instantExp.isBefore(instant))) {
            throw new ApplicationException("Time of user verification link has expired", HttpStatus.BAD_REQUEST);
        }
        user.setEnabled(true);
        userRepository.save(user);
        tokenRepository.delete(verificationToken);
    }

    public void updatePassword(Long id, PasswordDto passwordDto) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            if (user.get().isEnabled()) {
                if(passwordEncoder.matches(passwordDto.getOldPassword(), user.get().getPassword())) {
                    user.get().setPassword(passwordEncoder.encode(passwordDto.getPassword()));
                    userRepository.save(user.get());
                } else
                    throw new ApplicationException("The password you've entered doesn't match your current one", HttpStatus.BAD_REQUEST);
            } else
                throw new ApplicationException("Please, verify your account first", HttpStatus.OK);
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
}