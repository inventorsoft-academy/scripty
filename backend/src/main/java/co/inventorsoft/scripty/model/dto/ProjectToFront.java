package co.inventorsoft.scripty.model.dto;

import java.time.LocalDateTime;
import lombok.Value;

@Value
public class ProjectToFront {
	Long id;
	String name;
	String description;
	Boolean visibility;
	Boolean archive;
	LocalDateTime createDate;
}
