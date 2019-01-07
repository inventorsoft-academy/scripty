package co.inventorsoft.scripty.service;

import java.util.List;
import co.inventorsoft.scripty.model.dto.TicketDto;
import co.inventorsoft.scripty.model.dto.TicketToFront;
import co.inventorsoft.scripty.model.entity.Ticket;

/**
 * @author lzabidovsky 
 */
public interface TicketService {
	long saveTicket(TicketDto ticket, String username);
	Ticket getTicket(Long ticketId);
	List<TicketToFront> getAll();
	void archiveTicket(Long ticketId, boolean archive);
}
