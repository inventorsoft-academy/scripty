package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.model.dto.*;
import co.inventorsoft.scripty.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    void registerNewUserAccount(UserDto userDto);
    void resendRegistrationToken(EmailDto emailDto);
    void validateVerificationToken(String token);
    User findByEmail(String email);
    void updatePassword(String email, UpdatePasswordDto updatePasswordDto);
    void sendResetPasswordToken(EmailDto emailDto);
    void setPicture(String email, MultipartFile picture);
    PictureDto getPicture(Long id);
    void updateForgottenPassword(String email, String token, ResetPasswordDto resetPasswordDto);
    void updateProfile(String email, UpdateUserDto updateDto);
    Page<User> getAllUsers(Pageable pageable);
    Page<User>findByEmailStartsWith(String email, Pageable pageable);
    void changeUserStatus(long id, boolean status);
}
