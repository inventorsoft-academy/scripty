package co.inventorsoft.scripty.controller;

import co.inventorsoft.scripty.model.dto.PictureDto;
import co.inventorsoft.scripty.model.dto.StringResponse;
import co.inventorsoft.scripty.service.UserService;
import io.swagger.annotations.Api;
import org.apache.tomcat.util.http.fileupload.FileUploadBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.security.Principal;

/**
 * @author A1lexen
 */

@Api(description = "Operations for updating user data")
@RestController
public class UserProfileController {
    UserService userService;

    @Autowired
    UserProfileController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users/picture")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity setProfilePicture(Principal user, @RequestParam MultipartFile picture) {
        userService.setPicture(user.getName(), picture);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/users/{id}/picture", produces = "application/json")
    public ResponseEntity getProfilePicture(@PathVariable Long id) {
        PictureDto picture = userService.getPicture(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(picture);
    }
}
