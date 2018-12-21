package co.inventorsoft.scripty.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import co.inventorsoft.scripty.model.dto.ProjectToFront;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;

/**
 * @author lzabidovsky 
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {
	
	Optional<Project> findById(Long id);
	Optional<Project> findByNameAndUser(String name, User user);
	boolean existsByNameAndUser(String name, User user);
	Collection<Project> findByUser(User user);
	Collection<Project> findByVisibilityAndArchive(Boolean visibility, Boolean archive);
	Collection<Project> findByUserId(Long id);
}
