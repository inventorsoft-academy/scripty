package co.inventorsoft.scripty.repository;

import co.inventorsoft.scripty.model.dto.UserProfileToFront;
import co.inventorsoft.scripty.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByFirstName(String firstName);
    UserProfileToFront findByEmailAndEnabled(String email, boolean enabled);
}
