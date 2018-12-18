package co.inventorsoft.scripty.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import co.inventorsoft.scripty.model.dto.ProjectToFront;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;

/**
 * @author lzabidovsky 
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	
	Optional<Project> findById(Long id);
	Optional<Project> findByNameAndUser(String name, User user);
	boolean existsByNameAndUser(String name, User user);
	Collection<ProjectToFront> findByUser(User user);
	Collection<ProjectToFront> findByVisibilityAndArchive(Boolean visibility, Boolean archive);

}
