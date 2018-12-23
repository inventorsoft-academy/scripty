package co.inventorsoft.scripty.service;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import co.inventorsoft.scripty.model.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.repository.ProjectRepository;
import co.inventorsoft.scripty.repository.UserRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author lzabidovsky
 */
@Service
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProjectService {

    final static String DEFAULT_DESCRIPTION = "";
    final static boolean DEFAULT_VISIBILITY = true;

    ProjectRepository projectRepository;
    UserRepository userRepository;
    ProjectGithubService projectGithubService;
    DirectoryToObject directoryToObject;

    String pathLocalRepo;
    String directorySeparator;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository, ProjectGithubService projectGithubService, DirectoryToObject directoryToObject, @Value("${path.local.repo}") String pathLocalRepo, @Value("${directory.separator}") String directorySeparator) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.projectGithubService = projectGithubService;
        this.directoryToObject = directoryToObject;
        this.pathLocalRepo = pathLocalRepo;
        this.directorySeparator = directorySeparator;
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
        newProject.setFilesMetadata(directoryToObject.convert(projectPath));

        return projectRepository.save(newProject).getId();
    }

    public Project getProject(Long projectId) {
        return projectRepository.findById(projectId).orElseThrow(() -> new ApplicationException("Project with ID="+projectId+" does not exist" , HttpStatus.NOT_FOUND));
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
        newProject.setFilesMetadata(directoryToObject.convert(projectPath));

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

    public void uploadMeta(Principal userName, String metadata, MultipartFile file, Long id) throws IOException {

        Project project = projectRepository.findById(id).orElseThrow(() -> new ApplicationException("There is no projetct with id " + id, HttpStatus.NOT_FOUND));
        User user = userRepository.findByEmail(userName.getName()).orElseThrow(() -> new ApplicationException("There is no " + userName, HttpStatus.NOT_FOUND));
        if (!projectRepository.existsByNameAndUser(project.getName(), user)) {
            throw new ApplicationException("Denied in access to project with name  " + project.getName() + "  " + userName, HttpStatus.CONFLICT);
        }
        Path projectPath = Paths.get(project.getPath());
        Path directoryPath = Paths.get(project.getPath() + directorySeparator + metadata);
        DirectoryNode projectDirectoryNode = project.getFilesMetadata();
        Files.createDirectories(directoryPath);
        if(file!=null) {
            byte[] bytes = file.getBytes();
            Path pathsWithFileName = Paths.get(directoryPath + directorySeparator + file.getOriginalFilename());
            Files.write(pathsWithFileName, bytes);
            String pathName = pathsWithFileName.getFileName().toString();
            String start = pathsWithFileName.toString().substring(0,pathsWithFileName.toString().lastIndexOf(directorySeparator));
//            Node fileNode = listMetadata(Paths.get(start), pathName, projectPath.getFileName().toString()+directorySeparator+metadata+directorySeparator+file.getOriginalFilename());
//            addMeta(projectDirectoryNode, fileNode );
            return;
        }

       Node fileNode = directoryToObject.metadataToNode(projectPath, Paths.get(metadata));
       addMeta(projectDirectoryNode, fileNode );


    }
    public void addMeta(DirectoryNode projectNode, Node metaNode){
        if(!projectNode.getName().equals(Paths.get(metaNode.getParent()).getFileName().toString())){

            Optional<Node> directoryNode = projectNode.getChildren().stream()
                    .filter(x->metaNode.getPath().startsWith(x.getPath()))
                    .findAny();
            addMeta((DirectoryNode)directoryNode.get(), metaNode);
        }else {
            projectNode.getChildren().add(metaNode);
        }
    }
}
