package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.model.dto.ProjectDto;
import co.inventorsoft.scripty.model.dto.ProjectUpdateDto;
import co.inventorsoft.scripty.model.dto.ProjectGithub;
import co.inventorsoft.scripty.model.entity.Project;
import org.springframework.security.core.Authentication;
import java.util.List;
/**
 * @author lzabidovsky
 */
public interface ProjectService {
    long saveProject(ProjectDto project, String username);
    Project getProject(Long projectId);
    void updateProject(Long projectId, ProjectUpdateDto projectUpdateDto);
    void archiveProject(Long projectId, boolean archive);
    long saveGithubProject(ProjectGithub project, String username);
    List<Project> getProjects(Authentication authentication);
    List<Project> getProjectsByUser(Long id);


}
