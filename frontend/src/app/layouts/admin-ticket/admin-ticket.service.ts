import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminTicketService {

    constructor(private _httpClient: HttpClient) {
    }

    sendReport(title: string, description: string) {
        return this._httpClient.post('/api/tickets', {
            description: description,
            title: title
        });
    }
}
