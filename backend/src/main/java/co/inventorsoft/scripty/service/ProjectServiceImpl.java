package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.ProjectDto;
import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.repository.ProjectRepository;
import co.inventorsoft.scripty.repository.UserRepository;
import co.inventorsoft.scripty.repository.specification.ProjectFilter;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProjectServiceImpl implements ProjectService {

	final static String DEFAULT_DESCRIPTION = "";
	final static boolean DEFAULT_VISIBILITY = true;
	public static final String UNATHORIZED_USER_EMAIL = "anonymousUser";

	ProjectRepository projectRepository;
	UserRepository userRepository;

	String pathLocalRepo;
	String directorySeparator;

	@Autowired
	public ProjectServiceImpl(ProjectRepository projectRepository, UserRepository userRepository, @Value("${path.local.repo}") String pathLocalRepo, @Value("${directory.separator}") String directorySeparator) {
		this.projectRepository = projectRepository;
		this.userRepository = userRepository;
		this.pathLocalRepo = pathLocalRepo;
		this.directorySeparator = directorySeparator;
	}

	@Override
	public List<Project> getProjects(Authentication authentication) {
		User user = Optional.ofNullable(authentication).flatMap(auth -> userRepository.findByEmail(auth.getName())).orElse(null);
		return projectRepository.findAll(ProjectFilter.getFilter(user));
	}

	@Override
	public List<Project> getProjectsByUser(Long id) {

		return (List<Project>) projectRepository.findByUserId(id);
	}

	public long saveProject(ProjectDto project, String username) {
		User user = userRepository.findByEmail(username).orElseThrow(() -> new ApplicationException("There is no " + username, HttpStatus.NOT_FOUND));
		if (projectRepository.existsByNameAndUser(project.getName(), user)) {
			throw new ApplicationException("Project with name " + project.getName() + " already exist for " + username, HttpStatus.CONFLICT);
		}

		Project newProject = new Project();
		newProject.setName(project.getName());
		if(project.getDescription() != null) {
			newProject.setDescription(project.getDescription());
		} else {
			newProject.setDescription(DEFAULT_DESCRIPTION);
		}
		if(project.getVisibility() != null) {
			newProject.setVisibility(project.getVisibility());
		} else {
			newProject.setVisibility(DEFAULT_VISIBILITY);
		}
		newProject.setArchive(false);

		String projectPath = pathLocalRepo + username + directorySeparator + project.getName();
		createProjectPath(projectPath);
		newProject.setPath(projectPath);
		newProject.setUser(user);
		newProject.setCreateDate(LocalDateTime.now());

		return projectRepository.save(newProject).getId();
	}

	private void createProjectPath(String projectPath) {
		Path path = Paths.get(projectPath);
		if(!Files.exists(path)) {
			try {
				Files.createDirectories(path);
			} catch (IOException e) {
				throw new ApplicationException("Error repo creating " + projectPath, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
