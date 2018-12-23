package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.model.dto.ProjectToFront;
import org.springframework.security.core.Authentication;

import java.util.Collection;

public interface ProjectServiceInterface {
    public Collection<ProjectToFront> getProjectList(Authentication auth);
}
