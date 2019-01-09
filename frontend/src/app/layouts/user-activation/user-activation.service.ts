import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserActivationService {

    private myHttpClient: HttpClient;
    constructor(private httpClient: HttpClient,
                private handler: HttpBackend) {
        this.myHttpClient = new HttpClient(this.handler);
    }

    activateUser(token: string) {
        return this.myHttpClient.get('/api/registrationConfirm?token=' + token);
    }

    resendEmail(email: string) {
        return this.httpClient.post('/api/user/resendRegistrationToken', {
            'email': email
        });
    }
}
