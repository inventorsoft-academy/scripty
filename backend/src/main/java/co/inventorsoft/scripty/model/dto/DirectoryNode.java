package co.inventorsoft.scripty.model.dto;

import java.io.Serializable;
import java.util.LinkedList;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

/**
 * @author lzabidovsky
 */
@NoArgsConstructor
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DirectoryNode extends Node implements Serializable {
    private static final long serialVersionUID = 1L;

    LinkedList<Node> children;

    public DirectoryNode(String parent, String path, String name) {
        super(parent, path, name, "directory");
        children = new LinkedList<>();
    }

}
