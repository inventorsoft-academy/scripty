package co.inventorsoft.scripty.model.dto;

import java.time.LocalDateTime;

public interface TicketToFront {
	Long getId();
	String getTitle();
	String getDescription();
	Boolean getArchive();
	LocalDateTime getCreateDate();
	UserToFront getUser();
	
	interface UserToFront {
		String getEmail();
		String getFirstName();
		String getLastName();
	}
}
