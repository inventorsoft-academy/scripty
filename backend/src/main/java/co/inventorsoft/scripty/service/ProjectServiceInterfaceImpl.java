package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.ProjectToFront;
import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.repository.ProjectRepository;
import co.inventorsoft.scripty.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class ProjectServiceInterfaceImpl implements ProjectServiceInterface {

    ProjectRepository projectRepository;
    UserRepository userRepository;

    @Autowired
    public ProjectServiceInterfaceImpl(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;

    }

    public Collection<ProjectToFront> getProjectList(Authentication auth) {
        if(auth==null) {
            return projectRepository.findByVisibilityAndArchive(true, false);
        } else {
            User user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new ApplicationException("There is no " + auth.getName(), HttpStatus.NOT_FOUND));
            return projectRepository.findByUser(user);
        }
    }
}
