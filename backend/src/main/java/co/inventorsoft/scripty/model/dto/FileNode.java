package co.inventorsoft.scripty.model.dto;

import java.io.Serializable;

import lombok.NoArgsConstructor;

/**
 * @author lzabidovsky
 */
@NoArgsConstructor
public class FileNode extends Node implements Serializable {
    private static final long serialVersionUID = 1L;

    public FileNode(String parent, String path, String name) {
        super(parent, path, name, "file");
    }

}
