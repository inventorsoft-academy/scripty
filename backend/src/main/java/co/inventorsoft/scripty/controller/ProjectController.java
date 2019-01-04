package co.inventorsoft.scripty.controller;

import javax.validation.Valid;
import co.inventorsoft.scripty.service.ProjectFilesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import co.inventorsoft.scripty.model.dto.DirectoryNode;
import co.inventorsoft.scripty.model.dto.ProjectDto;
import co.inventorsoft.scripty.model.dto.ProjectUpdateDto;
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
    ProjectFilesService projectFilesService;

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
        securityService.projectHasPublicVisibilityOrUserIsOwner(projectService.getProject(projectId), authentication);
        return ResponseEntity.ok(projectService.getProject(projectId).getFilesMetadata());
    }

    @ApiOperation(value = "Endpoint to update project. It consumes project description and visibility.")
    @PutMapping(value = "/{projectId}", produces = "application/json", consumes = "application/json")
    public ResponseEntity<StringResponse> updateProject(Authentication authentication, @PathVariable Long projectId, @Valid @RequestBody ProjectUpdateDto projectUpdateDto) {
        securityService.projectUserIsOwner(projectService.getProject(projectId), authentication);
        projectService.updateProject(projectId, projectUpdateDto);
        return ResponseEntity.ok(new StringResponse("Project with ID = " + projectId + " was updated"));
    }

    @ApiOperation(value = "Endpoint to archive project. Archive means that it won't be listed in the project list for, but still will be in the system.")
    @PutMapping(value = "/{projectId}", produces = "application/json")
    public ResponseEntity<StringResponse> archiveProject(Authentication authentication, @PathVariable Long projectId, @RequestParam boolean archive) {
        securityService.projectUserIsOwner(projectService.getProject(projectId), authentication);
        projectService.archiveProject(projectId, archive);
        return ResponseEntity.ok(new StringResponse("Project ID = " + projectId + " archive status was changed"));
    }

    @ApiOperation(value = "Endpoint to upload project's file. It consumes file and relative path of this file")
    @PostMapping(value = "/{projectId}")
    @ResponseStatus(HttpStatus.OK)
    public void uploadFile(Authentication authentication,
                           @PathVariable Long projectId,
                           @RequestParam(required = false) MultipartFile file,
                           @RequestParam(defaultValue = "") String metadata){
        securityService.projectUserIsOwner(projectService.getProject(projectId), authentication);
        projectFilesService.uploadProjectFile(metadata, file, projectId);
    }

    @DeleteMapping(value = "/{projectId}/files")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProjectFile(Authentication authentication,
                                  @PathVariable Long projectId,
                                  @RequestParam String filePath) throws IOException {
        securityService.projectUserIsOwner(projectService.getProject(projectId), authentication);
        projectFilesService.deleteProjectFile(projectId, filePath);
    }
}
