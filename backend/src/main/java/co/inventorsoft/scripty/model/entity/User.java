package co.inventorsoft.scripty.model.entity;
import co.inventorsoft.scripty.model.dto.PictureDto;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
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

    @Column(length = 60)
    String password;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = PictureConverter.class)
    PictureDto picture;

    @Column(nullable = false)
    boolean enabled;

    @Column(nullable = false, length = 10)
    String role;

    @CreationTimestamp
    private Instant createDate;
}
