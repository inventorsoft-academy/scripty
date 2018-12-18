package co.inventorsoft.scripty.model.dto;

import java.io.Serializable;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

/**
 * @author lzabidovsky 
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Node implements Serializable {
	private static final long serialVersionUID = 1L;

	String parent;
	String path;
	String name;
	String type;

}
