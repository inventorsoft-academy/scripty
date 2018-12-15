import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegConfirmationService {

    constructor(private httpClient: HttpClient) { }

    activateUser(token: string) {
        // return this.httpClient.get('/api/registrationConfirm?token=' + token);
        return this.httpClient.get('http://www.mocky.io/v2/5c14f9f33400005e1cb8e98d');
    }

    resendEmail(email: string) {
        return this.httpClient.post('/api/user/resendRegistrationToken', {
            'email': email
        });
    }
}
