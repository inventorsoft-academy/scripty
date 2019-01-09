import {Component, OnInit} from '@angular/core';
import {TicketListService} from './ticket-list.service';
import {Ticket} from '../../../../models/Ticket';
import {MatDialog} from '@angular/material';
import {ImageModalComponent} from './image-modal/image-modal.component';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
    tickets: Array<Ticket>;

    constructor(private _ticketListService: TicketListService,
                private _dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getTickets();
    }

    getTickets() {
        this._ticketListService.getTickets()
            .subscribe(
                (response: Array<Ticket>) => {
                    this.tickets = response;
                    this.tickets = this.tickets.sort((a, b) => {
                        if (b.archive) {
                            return -1;
                        }

                        return 0;
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    archiveTicket(id: number, value: boolean) {
        this._ticketListService.archiveTickets(id, value)
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

    downloadImage(ticket: Ticket) {
        if (ticket.hasOwnProperty('hasImage')) {
            return;
        }
        this._ticketListService.getImage(ticket.id)
            .subscribe(
                res => {
                    if (res) {
                        ticket['hasImage'] = true;
                        const src = `data:${res['extension']};base64,${res['content']}`;
                        document.getElementById('src' + ticket.id).setAttribute('src', src);
                    } else {
                        ticket['hasImage'] = false;
                    }
                },
                err => {
                    console.log(err);
                }
            );
    }

    openImage(event) {
        event.preventDefault();
        this._dialog.open(ImageModalComponent, {
            data: event.target['src']
        });
    }
}
