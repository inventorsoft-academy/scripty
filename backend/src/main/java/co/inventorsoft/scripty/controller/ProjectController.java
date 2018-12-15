package co.inventorsoft.scripty.controller;

import javax.validation.Valid;

import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.service.ProjectServiceInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import co.inventorsoft.scripty.model.dto.ProjectDto;
import co.inventorsoft.scripty.model.dto.StringResponse;
import co.inventorsoft.scripty.service.ProjectService;
import co.inventorsoft.scripty.service.SecurityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

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
	ProjectServiceInterface projectServiceInterface;

	@ApiOperation(value = "Endpoint to create new projects. The endpoint consumes fields: name(required), description(optional), visibility: public(true) or private(false).")
	@PostMapping(consumes = "application/json")
	public ResponseEntity<StringResponse> saveProject(Authentication authentication, @Valid @RequestBody ProjectDto project) {
		securityService.authenticationHasRoleUser(authentication);
		long projectId = projectService.saveProject(project, authentication.getName());
		return ResponseEntity.status(HttpStatus.CREATED).body(new StringResponse("New project was created with ID = " + projectId));
	}

	@RequestMapping("/projectsByUserId")
	List<Project> getProjectsUserId(@RequestParam("userId") Long id) {

		return projectServiceInterface.getProjectsByUser(id);
	}
}

