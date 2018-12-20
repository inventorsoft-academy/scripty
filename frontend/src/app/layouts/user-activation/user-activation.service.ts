import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserActivationService {

    constructor(private httpClient: HttpClient) { }

    activateUser(token: string) {
        return this.httpClient.get('/api/registrationConfirm?token=' + token);
    }

    resendEmail(email: string) {
        return this.httpClient.post('/api/user/resendRegistrationToken', {
            'email': email
        });
    }
}
