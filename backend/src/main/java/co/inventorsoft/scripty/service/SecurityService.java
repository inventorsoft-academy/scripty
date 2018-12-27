package co.inventorsoft.scripty.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.entity.Project;

/**
 * @author lzabidovsky
 */
@Service
public class SecurityService {

    public void authenticationHasRoleUser(Authentication authentication) {
        if(authentication == null) {
            throw new ApplicationException("No authentication" , HttpStatus.UNAUTHORIZED);
        }
        if(!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_USER"))) {
            throw new ApplicationException(authentication.getName()+" does not have ROLE_USER" , HttpStatus.FORBIDDEN);
        }
    }

    public void projectHasPublicVisibilityOrUserIsOwner(Project project, Authentication auth) {
        String username = auth==null ? "Anonymous" : auth.getName();
        if(!project.getVisibility() && !project.getUser().getEmail().equals(username)) {
            throw new ApplicationException(username+" has no access to project "+project.getId(), HttpStatus.FORBIDDEN);
        }
    }

    public void projectUserIsOwner(Project project, Authentication auth) {
        String username = auth==null ? "Anonymous" : auth.getName();
        if(!project.getUser().getEmail().equals(username)) {
            throw new ApplicationException(username+" has no access to project "+project.getId(), HttpStatus.FORBIDDEN);
        }
    }

}
