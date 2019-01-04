package co.inventorsoft.scripty.repository;
import co.inventorsoft.scripty.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByFirstName(String firstName);
    @Query("Select u from User u where ?1 IS NULL OR length(?1) = 0 OR email like %?1%")
    Page<User> findByEmailStartsWith(String email, Pageable pageable);

}
