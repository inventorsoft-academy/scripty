package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.ProjectDto;
import co.inventorsoft.scripty.model.dto.ProjectGithub;
import co.inventorsoft.scripty.model.dto.ProjectUpdateDto;
import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.repository.ProjectRepository;
import co.inventorsoft.scripty.repository.UserRepository;
import co.inventorsoft.scripty.repository.specification.Filter;

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
import java.util.Collection;
import java.util.List;

@Service
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProjectServiceImpl implements ProjectService {

	final static String DEFAULT_DESCRIPTION = "";
	final static boolean DEFAULT_VISIBILITY = true;
	public static final String UNATHORIZED_USER_EMAIL = "anonymousUser";

	ProjectRepository projectRepository;
	UserRepository userRepository;
	ProjectGithubService projectGithubService;

	String pathLocalRepo;
	String directorySeparator;

	@Autowired
	public ProjectServiceImpl(ProjectRepository projectRepository, UserRepository userRepository,ProjectGithubService projectGithubService, @Value("${path.local.repo}") String pathLocalRepo, @Value("${directory.separator}") String directorySeparator) {
		this.projectRepository = projectRepository;
		this.userRepository = userRepository;
		this.projectGithubService = projectGithubService;
		this.pathLocalRepo = pathLocalRepo;
		this.directorySeparator = directorySeparator;
	}

	@Override
	public List<Project> getProjects(String userEmail) {

		User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ApplicationException("There is no " + userEmail, HttpStatus.NOT_FOUND));

		return projectRepository.findAll(Filter.getFilter(user));

	}

	@Override
	public List<Project> getProjects(Authentication authentication) {

		if (authentication == null) {
			return (List<Project>) projectRepository.findByVisibilityAndArchive(true, false);
		} else {
			User user = (User) userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new ApplicationException("There is no " + authentication.getName(), HttpStatus.NOT_FOUND));
			return projectRepository.findAll(Filter.getFilter(user));
		}
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

	public Project getProject(Long projectId) {
		return projectRepository.findById(projectId).orElseThrow(() -> new ApplicationException("Project with ID="+projectId+" does not exist" , HttpStatus.NOT_FOUND));
	}

	public void updateProject(Long projectId, ProjectUpdateDto projectUpdateDto) {
		Project project = getProject(projectId);
		project.setDescription(projectUpdateDto.getDescription());
		project.setVisibility(projectUpdateDto.getVisibility());
		projectRepository.save(project);
	}

	public long saveGithubProject(ProjectGithub project, String username) {
		User user = userRepository.findByEmail(username).orElseThrow(() -> new ApplicationException("There is no " + username, HttpStatus.NOT_FOUND));
		String reponame = projectGithubService.getGithubRepoName(project.getGithubURL());
		if (projectRepository.existsByNameAndUser(reponame, user)) {
			throw new ApplicationException("Project with name " + reponame + " already exist for " + username, HttpStatus.CONFLICT);
		}

		Project newProject = new Project();
		newProject.setName(reponame);
		newProject.setDescription(project.getGithubURL());
		newProject.setVisibility(DEFAULT_VISIBILITY);
		newProject.setArchive(false);

		String projectPath = pathLocalRepo + username + directorySeparator + reponame;
		projectGithubService.cloneGithubRepo(project.getGithubURL(), projectPath);
		newProject.setPath(projectPath);
		newProject.setUser(user);
		newProject.setCreateDate(LocalDateTime.now());

		return projectRepository.save(newProject).getId();
	}
}
