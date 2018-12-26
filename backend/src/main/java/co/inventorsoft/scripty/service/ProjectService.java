package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.model.dto.ProjectDto;
import co.inventorsoft.scripty.model.entity.Project;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ProjectService {

    List<Project> getProjects(String userEmail);

    List<Project> getProjects(Authentication authentication);

    List<Project> getProjectsByUser(Long id);

    long saveProject(ProjectDto project, String username);


}
