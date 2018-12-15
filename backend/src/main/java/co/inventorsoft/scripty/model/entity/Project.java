package co.inventorsoft.scripty.model.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

/**
 * @author lzabidovsky 
 */
@Entity
@Table(name = "projects")
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "project_id", unique = true, nullable = false)
	Long id;
	
	@Column(name="name", nullable = false, length = 50)
	String name;

	String description;
	
	String path;
	
	Boolean visibility;
	
	Boolean archive;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id")
	@JsonIgnore
	User user;
	
	LocalDateTime createDate;

	@OneToMany(mappedBy = "project")
	@JsonIgnore
	private List<Comment> comments = new ArrayList<>();
	
}
