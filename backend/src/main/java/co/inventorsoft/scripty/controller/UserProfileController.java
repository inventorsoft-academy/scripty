package co.inventorsoft.scripty.controller;

import co.inventorsoft.scripty.model.dto.PictureDto;
import co.inventorsoft.scripty.model.dto.StringResponse;
import co.inventorsoft.scripty.service.UserService;
import io.swagger.annotations.Api;
import org.apache.tomcat.util.http.fileupload.FileUploadBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

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
    public ResponseEntity setProfilePicture(@RequestParam MultipartFile picture) {
        userService.setPicture("alex30030@gmail.com", picture);
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
