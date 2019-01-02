import {Component, OnInit} from '@angular/core';
import {TicketListService} from './ticket-list.service';
import {Ticket} from '../../../../models/Ticket';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
    tickets: Array<Ticket>;

    constructor(private ticketListService: TicketListService) {
    }

    ngOnInit(): void {
        this.getTickets();
    }

    getTickets() {
        this.ticketListService.getTickets()
            .subscribe(
                (response: Array<Ticket>) => {
                    this.tickets = response;
                    this.tickets = this.tickets.sort((ticket) => {
                        return ticket.archive ? 1 : -1;
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    archiveTicket(id: number, value: boolean) {
        this.ticketListService.archiveTickets(id, value)
            .subscribe(
                response => {
                    console.log(response['response']);
                    this.getTickets();
                },
                error => {
                    console.log(error);
                }
            );
    }
}
