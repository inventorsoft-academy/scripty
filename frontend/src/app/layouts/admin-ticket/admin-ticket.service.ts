import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminTicketService {

    constructor(private httpClient: HttpClient) {
    }

    sendReport(title: string, description: string, file: string) {
        const headers = new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJsb3JlbUBjbGlwdGlrLm5ldCIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1NDU4MTg2MjMsImF1dGhvcml0aWVzIjpbIlVzZXIiXSwianRpIjoiNzM3YjQ2OTUtMTQzNS00ZjY1LTk1YTYtN2U3OTc0Y2E1MTM3IiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.AOSsNDpCE_BY4I7paCuYrokHnG4s37WMAI_H-3GygsU'});
        return this.httpClient.post('/api/tickets', {
                description: description,
                title: title
                // file: file
            },
            {
                headers: headers
            });
    }
}
