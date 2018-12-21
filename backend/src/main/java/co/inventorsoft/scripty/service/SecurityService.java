package co.inventorsoft.scripty.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

/**
 * @author lzabidovsky 
 */
@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SecurityService {

	ProjectRepository projectRepository;

	public void authenticationHasRoleUser(Authentication authentication) {
		if(!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_USER"))) {
			throw new ApplicationException(authentication.getName()+" does not have ROLE_USER" , HttpStatus.FORBIDDEN);
		}
	}

	public void projectHasPublicVisibilityOrUserIsOwner(Long projectId, Authentication auth) {
		Project project = projectRepository.findById(projectId).orElseThrow(() -> new ApplicationException("Project with ID="+projectId+" does not exist" , HttpStatus.NOT_FOUND));
		String username = auth==null ? "Anonymous" : auth.getName();
		if(!project.getVisibility() && !project.getUser().getEmail().equals(username)) {
			throw new ApplicationException(username+" has no access to project "+projectId, HttpStatus.FORBIDDEN);
		}
	}

}
