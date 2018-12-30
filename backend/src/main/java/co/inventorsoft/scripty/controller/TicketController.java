package co.inventorsoft.scripty.controller;

import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import co.inventorsoft.scripty.model.dto.StringResponse;
import co.inventorsoft.scripty.model.dto.TicketDto;
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
@Api("Controller for Ticket endpoints")
public class TicketController {

	TicketService ticketService;

	@ApiOperation(value = "Endpoint to create new ticket. The endpoint consumes fields: title(required), description(required).")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	@PostMapping(consumes = "application/json")
	public ResponseEntity<StringResponse> saveTicket(Authentication auth, @Valid @RequestBody TicketDto ticket) {
		long ticketId = ticketService.saveTicket(ticket, auth.getName());
		return ResponseEntity.status(HttpStatus.CREATED).body(new StringResponse("New ticket was created with ID = " + ticketId));
	}

}
