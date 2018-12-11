package co.inventorsoft.scripty.model.entity;

import jdk.nashorn.internal.objects.annotations.Constructor;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * @author A1lexen
 */

@Entity
@Getter
@Setter
@Table(name="images")
@RequiredArgsConstructor
@NoArgsConstructor
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PICTURE_ID")
    Long id;

    @NonNull
    @Column
    @Lob
    byte[] content;

    @NonNull
    @Column
    String extension;
}

