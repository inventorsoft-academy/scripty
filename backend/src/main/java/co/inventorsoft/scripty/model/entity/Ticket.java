package co.inventorsoft.scripty.model.entity;

import java.time.LocalDateTime;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import co.inventorsoft.scripty.model.dto.PictureDto;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

/**
 * @author lzabidovsky 
 */
@Entity
@Table(name = "tickets")
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ticket {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	Long id;
	
	@Column(nullable = false, length = 50)
	String title;

	@Column(nullable = false)
	String description;

	@Column(nullable = false)
	Boolean archive = Boolean.FALSE;
	
	@CreationTimestamp
	LocalDateTime createDate;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	User user;

	@Embedded
	@AttributeOverrides(value = {
			@AttributeOverride(name = "content", column = @Column(name = "p_content", columnDefinition = "LONGTEXT")),
			@AttributeOverride(name = "extension", column = @Column(name = "p_extension", length = 25))
	})
	PictureDto picture;

}
