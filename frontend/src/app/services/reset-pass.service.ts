import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ResetPassService {

    constructor(private httpClient: HttpClient) {
    }

    sendResetLink(email: string) {
        return this.httpClient.post('api/user/sendPasswordReset', {
            'email': email
        });
    }
}
