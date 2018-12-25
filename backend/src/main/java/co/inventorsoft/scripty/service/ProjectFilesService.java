package co.inventorsoft.scripty.service;

import org.springframework.web.multipart.MultipartFile;

public interface ProjectFilesService {
    void uploadProjectFile(String metadata, MultipartFile file, Long projectId);
}
