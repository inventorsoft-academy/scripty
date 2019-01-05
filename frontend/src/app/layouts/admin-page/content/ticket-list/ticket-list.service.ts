import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TicketListService {

    constructor(private httpClient: HttpClient) {
    }

    getTickets() {
        return this.httpClient.get('/api/tickets');
    }

    archiveTickets(id: number, value = true) {
        return this.httpClient.put(`/api/tickets/${id}?archive=${value}`, {});
    }

    getImage(id: number) {
        return this.httpClient.get(`/tickets/${id}/picture`);
    }
}
