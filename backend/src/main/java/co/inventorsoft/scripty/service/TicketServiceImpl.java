package co.inventorsoft.scripty.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.google.common.io.Files;
import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.ImageTypes;
import co.inventorsoft.scripty.model.dto.PictureDto;
import co.inventorsoft.scripty.model.dto.TicketDto;
import co.inventorsoft.scripty.model.dto.TicketToFront;
import co.inventorsoft.scripty.model.entity.Ticket;
import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.repository.TicketRepository;
import co.inventorsoft.scripty.repository.UserRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * @author lzabidovsky 
 */
@Service
@Transactional
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketServiceImpl implements TicketService {

	TicketRepository ticketRepository;
	UserRepository userRepository;
	
	public long saveTicket(TicketDto ticket, String username, MultipartFile picture) {
		User user = userRepository.findByEmail(username).orElseThrow(() -> new ApplicationException("There is no " + username, HttpStatus.NOT_FOUND));
		Ticket newTicket = new Ticket();
		newTicket.setUser(user);
		newTicket.setTitle(ticket.getTitle());
		newTicket.setDescription(ticket.getDescription());
		if(picture != null) {
			if (!ImageTypes.contains(Files.getFileExtension(picture.getOriginalFilename()))) {
				throw new ApplicationException("Incorrect file extension", HttpStatus.BAD_REQUEST);
			}
			try {
				newTicket.setPicture(new PictureDto(Base64.getEncoder().encodeToString(picture.getBytes()), picture.getContentType()));
			} catch (IOException e) {
				throw new ApplicationException("Picture error. Please, try to use another one!", HttpStatus.BAD_REQUEST);
			}
		}
		return ticketRepository.save(newTicket).getId();
	}

	public Ticket getTicket(Long ticketId) {
		return ticketRepository.findById(ticketId).orElseThrow(() -> new ApplicationException("Ticket with ID="+ticketId+" does not exist" , HttpStatus.NOT_FOUND));
	}

	public List<TicketToFront> getAll() {
		return ticketRepository.findAllByOrderByCreateDateDesc();
	}

	public void archiveTicket(Long ticketId, boolean archive) {
		Ticket ticket = getTicket(ticketId);
		ticket.setArchive(archive);
		ticketRepository.save(ticket);
	}

	public PictureDto getPicture(Long ticketId) {
		return getTicket(ticketId).getPicture();
	}

}
