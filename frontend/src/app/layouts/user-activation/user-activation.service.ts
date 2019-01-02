import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserActivationService {

    constructor(private httpClient: HttpClient) { }

    activateUser(token: string) {
        return this.httpClient.get('/public/api/registrationConfirm?token=' + token);
    }

    resendEmail(email: string) {
        return this.httpClient.post('/public/api/user/resendRegistrationToken', {
            'email': email
        });
    }
}
