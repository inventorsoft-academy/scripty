import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminTicketService {

    constructor(private _httpClient: HttpClient) {
    }

    sendReport(data: FormData) {
        return this._httpClient.post('/api/tickets', data);
    }
}
