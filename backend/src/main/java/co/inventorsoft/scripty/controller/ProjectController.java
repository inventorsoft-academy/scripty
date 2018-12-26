package co.inventorsoft.scripty.controller;

import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import co.inventorsoft.scripty.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.inventorsoft.scripty.model.dto.ProjectDto;
import co.inventorsoft.scripty.model.dto.StringResponse;
import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.service.SecurityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

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


	@ApiOperation(value = "Endpoint to get list of projects.")
	@GetMapping(produces = "application/json")
	public ResponseEntity<List<Project>> getProjects(Authentication authentication) {
		return ResponseEntity.ok(projectService.getProjects(authentication));
	}

}
