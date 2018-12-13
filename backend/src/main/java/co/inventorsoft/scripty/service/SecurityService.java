package co.inventorsoft.scripty.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import co.inventorsoft.scripty.exception.ApplicationException;

/**
 * @author lzabidovsky 
 */
@Service
public class SecurityService {
	
	public void authenticationHasRoleUser(Authentication authentication) {
		if(!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_USER"))) {
			throw new ApplicationException(authentication.getName()+" does not have ROLE_USER" , HttpStatus.FORBIDDEN);
		}
	}

}
