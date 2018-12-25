package co.inventorsoft.scripty.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProjectFilesService {
    void uploadProjectFile(String metadata, MultipartFile file, Long projectId);
    void deleteProjectFile(Long id, String filePath) throws IOException;
}
