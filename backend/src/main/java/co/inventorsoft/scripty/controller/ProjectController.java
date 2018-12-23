package co.inventorsoft.scripty.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import co.inventorsoft.scripty.model.dto.DirectoryNode;
import co.inventorsoft.scripty.model.dto.ProjectDto;
import co.inventorsoft.scripty.model.dto.ProjectGithub;
import co.inventorsoft.scripty.model.dto.StringResponse;
import co.inventorsoft.scripty.service.ProjectService;
import co.inventorsoft.scripty.service.SecurityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

/**
 * @author lzabidovsky
 */
@RestController
@RequestMapping(value = "/projects")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Api("Controller for Project endpoints")
public class ProjectController {

    ProjectService projectService;
    SecurityService securityService;

    @ApiOperation(value = "Endpoint to create new projects. The endpoint consumes fields: name(required), description(optional), visibility: public(true) or private(false).")
    @PostMapping(consumes = "application/json")
    public ResponseEntity<StringResponse> saveProject(Authentication authentication, @Valid @RequestBody ProjectDto project) {
        securityService.authenticationHasRoleUser(authentication);
        long projectId = projectService.saveProject(project, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(new StringResponse("New project was created with ID = " + projectId));
    }

    @ApiOperation(value = "Endpoint to clone GitHub project. The endpoint consumes field: githubURL(required).")
    @PostMapping(value = "/github", consumes = "application/json")
    public ResponseEntity<StringResponse> saveGithubProject(Authentication authentication, @Valid @RequestBody ProjectGithub project) {
        securityService.authenticationHasRoleUser(authentication);
        long projectId = projectService.saveGithubProject(project, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(new StringResponse("GitHub project was cloned with ID = " + projectId));
    }

    @ApiOperation(value = "Endpoint to get project's filesMetadata.")
    @GetMapping(value = "/{projectId}/files", produces = "application/json")
    public ResponseEntity<DirectoryNode> getProjectFilesMetadata(Authentication authentication, @PathVariable Long projectId) {
        securityService.projectHasPublicVisibilityOrUserIsOwner(projectId, authentication);
        return ResponseEntity.ok(projectService.getProject(projectId).getFilesMetadata());
    }
    @PostMapping(value = "/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public void uploadFile(Principal user,
                           @PathVariable Long id,
                           @RequestParam(required = false) MultipartFile file,
                           @RequestParam String metadata) throws IOException {
       projectService.uploadMeta(user, metadata, file, id);

    }

}
