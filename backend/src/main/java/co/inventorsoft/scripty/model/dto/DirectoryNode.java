package co.inventorsoft.scripty.model.dto;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

/**
 * @author lzabidovsky 
 */
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DirectoryNode extends FileNode implements Serializable {
	private static final long serialVersionUID = 1L;

	List<FileNode> children;

	public DirectoryNode(String parent, String path, String name) {
		super(parent, path, name, "directory");
		children = new LinkedList<>();
	}

}
