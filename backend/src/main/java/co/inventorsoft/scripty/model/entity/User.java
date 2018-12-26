package co.inventorsoft.scripty.model.entity;
import co.inventorsoft.scripty.model.dto.PictureDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.time.Instant;

/**
 *
 * @author Symyniuk
 *
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of="id")
@Entity
@Table(name = "users")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "first_name", length = 20)
    String firstName;

    @Column(name = "last_name", length = 20)
    String lastName;

    @Column(nullable = false, unique = true)
    String email;

    @JsonIgnore
    @Column(length = 60)
    String password;

    @Embedded
    @AttributeOverrides(value = {
            @AttributeOverride(name = "content",
                    column = @Column(name = "p_content", columnDefinition = "LONGTEXT")),
            @AttributeOverride(name = "extension",
                    column = @Column(name = "p_extension", length = 25))
    })
    @JsonIgnore
    PictureDto picture;

    @Column(nullable = false)
    boolean enabled;

    @Column(nullable = false, length = 10)
    String role;

    @CreationTimestamp
    private Instant createDate;

}


