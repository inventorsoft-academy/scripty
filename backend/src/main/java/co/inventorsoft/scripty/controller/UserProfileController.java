package co.inventorsoft.scripty.controller;

import co.inventorsoft.scripty.model.dto.PictureDto;
import co.inventorsoft.scripty.model.dto.StringResponse;
import co.inventorsoft.scripty.model.dto.UpdateUserDto;
import co.inventorsoft.scripty.service.UserService;
import io.swagger.annotations.Api;
import co.inventorsoft.scripty.model.dto.UpdatePasswordDto;
import io.swagger.annotations.ApiOperation;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.security.Principal;

/**
 * @author A1lexen
 */

@Api(description = "Operations for updating user data")
@RestController
@RequestMapping("/api/users")
public class UserProfileController {
    UserService userService;

    @Autowired
    UserProfileController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Upload picture for current user")
    @PostMapping("/picture")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity setProfilePicture(Principal user, @RequestParam MultipartFile picture) {
        userService.setPicture(user.getName(), picture);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "Get base64 users's picture by id in base64 string")
    @GetMapping(value = "/{id}/picture", produces = "application/json")
    public ResponseEntity getProfilePicture(@PathVariable Long id) {
        PictureDto picture = userService.getPicture(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(picture);
    }

    @ApiOperation(value = "Create new password if the old one's correct.")
    @PutMapping(value="/password")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity updatePassword(Principal user, @RequestBody @Valid UpdatePasswordDto updatePasswordDto){
        userService.updatePassword(user.getName(), updatePasswordDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "Updates user's profile info (first name, last name)")
    @PutMapping(value="/info")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity updateProfile(Principal user, @RequestBody @Valid UpdateUserDto updateDto){
        userService.updateProfile(user.getName(), updateDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "Changes user's profile status. ")
    @PutMapping(value="/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity changeStatus(@PathVariable long id, @RequestParam(value="status") boolean status) {
        userService.changeUserStatus(id, status);
        return ResponseEntity.ok(new StringResponse("Status of user with id " + id + " has been changed."));
    }
}
