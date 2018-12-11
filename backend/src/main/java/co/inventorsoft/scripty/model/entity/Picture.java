package co.inventorsoft.scripty.model.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

/**
 * @author A1lexen
 */

@Entity
@Getter
@Setter
@Table(name="images")
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PICTURE_ID")
    Long id;

    @Column
    @Lob
    byte[] content;

    @Column
    String extension;

    public boolean isEmpty() {
        return content.length == 0;
    }
}

