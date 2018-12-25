package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.DirectoryNode;
import co.inventorsoft.scripty.model.dto.Node;
import co.inventorsoft.scripty.model.entity.Project;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

/**
 * @author Symyniuk
 */
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Transactional
public class ProjectFilesServiceImpl implements ProjectFilesService{

    String directorySeparator;
    ProjectService projectService;
    DirectoryToObject directoryToObject;

    @Autowired
    public ProjectFilesServiceImpl(@Value("${directory.separator}")String directorySeparator,
                                   ProjectService projectService,
                                   DirectoryToObject directoryToObject) {
        this.directorySeparator = directorySeparator;
        this.projectService = projectService;
        this.directoryToObject = directoryToObject;
    }

    public void uploadProjectFile(String metadata, MultipartFile file, Long projectId){
        Project project = projectService.getProject(projectId);
        if(file == null){
            createDirectoryAndMetadata(project, metadata);
        }else {
            createFileAndMetadata(project, metadata, file);
        }
    }
    public void deleteProjectFile(Long id, String filePath) {
        Project project = projectService.getProject(id);
        //DirectoryNode projectFileMetadata = project.getFilesMetadata();
        Node deletedNode = directoryToObject.metadataToNode(Paths.get(project.getPath()), filePath);
        File file = new File(project.getPath() + directorySeparator + filePath);
        try {
            FileUtils.deleteDirectory(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        deleteMetadata(project.getFilesMetadata(), deletedNode);

    }
    private void deleteMetadata(DirectoryNode projectFileMetadata, Node deletedNode){
        if(!projectFileMetadata.getName().equals(Paths.get(deletedNode.getParent()).getFileName().toString())){
            Optional<Node> directoryNode = projectFileMetadata.getChildren().stream()
                    .filter(x->deletedNode.getPath().startsWith(x.getPath()))
                    .findAny();
            deleteMetadata((DirectoryNode)directoryNode.get(), deletedNode);
        }else {
            projectFileMetadata.getChildren().removeIf(x-> x.getName().equals(deletedNode.getName()));
        }
    }

    private void createFileAndMetadata(Project project, String metaPath, MultipartFile file){
        Path projectPath = Paths.get(project.getPath());
        String fileMetaPath = metaPath + directorySeparator + file.getOriginalFilename();
        Path absoluteFileMetaPath = Paths.get(projectPath.toString() + directorySeparator + fileMetaPath);
        byte[] bytes;
        if(Files.exists(absoluteFileMetaPath)){
            try {
                bytes = file.getBytes();
                Files.write(absoluteFileMetaPath, bytes);
            } catch (IOException e) {
                throw new ApplicationException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            try {
                bytes = file.getBytes();
                Files.write(absoluteFileMetaPath, bytes);
            } catch (IOException e) {
                throw new ApplicationException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            Node fileNode = directoryToObject.metadataToNode(projectPath, fileMetaPath);
            addNodeToProjectMetadata(project.getFilesMetadata(), fileNode);
        }
    }

    private void createDirectoryAndMetadata(Project project, String metaPath){
        Path projectPath = Paths.get(project.getPath());
        Path absoluteMetaPath = Paths.get(projectPath.toString() + directorySeparator + metaPath);
        if(Files.exists(absoluteMetaPath)){
            return;
        }
        try {
            Files.createDirectories(absoluteMetaPath);
        } catch (IOException e) {
            throw new ApplicationException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Node directoryNode = directoryToObject.metadataToNode(projectPath, metaPath);
        addNodeToProjectMetadata(project.getFilesMetadata(), directoryNode);
    }

    private void addNodeToProjectMetadata(DirectoryNode projectNode, Node metaNode){
        if(!projectNode.getName().equals(Paths.get(metaNode.getParent()).getFileName().toString())){
            Optional<Node> directoryNode = projectNode.getChildren().stream()
                    .filter(x->metaNode.getPath().startsWith(x.getPath()))
                    .findAny();
            addNodeToProjectMetadata((DirectoryNode)directoryNode.get(), metaNode);
        }else {
            projectNode.getChildren().add(metaNode);
        }
    }
}
