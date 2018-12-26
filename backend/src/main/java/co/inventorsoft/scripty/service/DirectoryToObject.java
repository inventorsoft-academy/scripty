package co.inventorsoft.scripty.service;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.DirectoryNode;
import co.inventorsoft.scripty.model.dto.FileNode;

/**
 * @author lzabidovsky 
 * 
 * convert directory tree structure
 * structure of output like to https://www.npmjs.com/package/dir-to-json
 */
@Component
public class DirectoryToObject {

	private Path globalPath;

	public DirectoryNode convert(String pathString) {
		globalPath = Paths.get(pathString);
		if(!Files.exists(globalPath) || !Files.isDirectory(globalPath)) {
			throw new ApplicationException("Error converting directory tree structure from " + pathString, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		DirectoryNode files = new DirectoryNode("..", "", globalPath.getFileName().toString());
		listFiles(globalPath, files);
		return files;
	}

	public String toJson(String pathString) {
		try {
			return new ObjectMapper().writeValueAsString(convert(pathString));
		} catch (JsonProcessingException e) {
			throw new ApplicationException("Error converting to JSON directory tree structure " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	private void listFiles(Path path, DirectoryNode dir) {
		try (DirectoryStream<Path> paths = Files.newDirectoryStream(path)) {
			for (Path entry : paths) {
				Path localPath = globalPath.relativize(entry);
				String parentString = (localPath.getParent() == null) ? "" : localPath.getParent().toString();
				String pathString = localPath.toString();
				String fileNameString = localPath.getFileName().toString();
				if (Files.isDirectory(entry)) {
					if (!fileNameString.equals(".git")) {
						DirectoryNode subdir = new DirectoryNode(parentString, pathString, fileNameString);
						dir.getChildren().add(subdir);
						listFiles(entry, subdir);
					}
				} else {
					dir.getChildren().add(new FileNode(parentString, pathString, fileNameString));
				}
			}
		} catch (IOException e) {
			throw new ApplicationException("Error converting directory tree structure " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		} 		
	}

}
