import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminTicketService {

    constructor(private httpClient: HttpClient) {
    }

    sendReport(title: string, description: string) {
        return this.httpClient.post('/api/tickets', {
            description: description,
            title: title
        });
    }
}
