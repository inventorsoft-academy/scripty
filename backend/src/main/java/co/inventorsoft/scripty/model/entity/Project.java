package co.inventorsoft.scripty.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import co.inventorsoft.scripty.model.dto.DirectoryNode;
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
    @Column(unique = true, nullable = false)
    Long id;

    @Column(nullable = false, length = 50)
    String name;

    String description;

    @JsonIgnore
    String path;

    Boolean visibility;

    Boolean archive;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    User user;

    LocalDateTime createDate;

    @JsonIgnore
    @Lob
    @Convert(converter = DirectoryNodeConverter.class)
    DirectoryNode filesMetadata;

}
