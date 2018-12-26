package co.inventorsoft.scripty.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import co.inventorsoft.scripty.model.entity.Ticket;

/**
 * @author lzabidovsky 
 */
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
	Optional<Ticket> findById(Long id);
}
