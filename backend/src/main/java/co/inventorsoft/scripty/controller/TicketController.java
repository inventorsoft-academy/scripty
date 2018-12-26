package co.inventorsoft.scripty.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import co.inventorsoft.scripty.model.dto.StringResponse;
import co.inventorsoft.scripty.model.dto.TicketDto;
import co.inventorsoft.scripty.model.dto.TicketToFront;
import co.inventorsoft.scripty.service.TicketService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * @author lzabidovsky 
 */
@RestController
@RequestMapping(value = "/tickets")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Api("Controller for Project endpoints")
public class TicketController {

	TicketService ticketService;

	@ApiOperation(value = "Endpoint to create new ticket. The endpoint consumes fields: title(required), description(required).")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	@PostMapping(consumes = "application/json")
	public ResponseEntity<StringResponse> saveTicket(Authentication auth, @Valid @RequestBody TicketDto ticket) {
		long ticketId = ticketService.saveTicket(ticket, auth.getName());
		return ResponseEntity.status(HttpStatus.CREATED).body(new StringResponse("New ticket was created with ID = " + ticketId));
	}

	@ApiOperation(value = "Endpoint to get all tickets.")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping(produces = "application/json")
	public ResponseEntity<List<TicketToFront>> getAll() {
		return ResponseEntity.ok(ticketService.getAll());
	}

	@ApiOperation(value = "Endpoint to archive ticket.")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@PutMapping(value = "/{ticketId}", produces = "application/json")
	public ResponseEntity<StringResponse> archiveTicket(@PathVariable Long ticketId, @RequestParam boolean archive) {
		ticketService.archiveTicket(ticketId, archive);
		return ResponseEntity.ok(new StringResponse("Ticket ID = " + ticketId + " archive status was changed"));
	}

}
