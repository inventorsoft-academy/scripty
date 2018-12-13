package co.inventorsoft.scripty.model.dto;

import java.io.Serializable;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

/**
 * @author lzabidovsky 
 */
@AllArgsConstructor
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FileNode implements Serializable {
	private static final long serialVersionUID = 1L;

	String parent;
	String path;
	String name;
	String type;

	public FileNode(String parent, String path, String name) {
		this.parent = parent;
		this.path = path;
		this.name = name;
		this.type = "file";
	}

}
