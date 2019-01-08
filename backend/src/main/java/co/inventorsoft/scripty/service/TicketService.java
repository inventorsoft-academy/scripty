package co.inventorsoft.scripty.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import co.inventorsoft.scripty.model.dto.PictureDto;
import co.inventorsoft.scripty.model.dto.TicketDto;
import co.inventorsoft.scripty.model.dto.TicketToFront;
import co.inventorsoft.scripty.model.entity.Ticket;

/**
 * @author lzabidovsky 
 */
public interface TicketService {
	long saveTicket(TicketDto ticket, String username, MultipartFile picture);
	Ticket getTicket(Long ticketId);
	List<TicketToFront> getAll();
	void archiveTicket(Long ticketId, boolean archive);
	PictureDto getPicture(Long ticketId);
}
