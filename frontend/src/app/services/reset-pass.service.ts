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

    setNewPassword(email: string, password: string, token: string) {
        return this.httpClient.put(`api/users/${email}/forgot-password/${token}`, {
            'password': {
                'matchingPassword': password,
                'password': password
            },
            'validPassword': password
        });
    }
}
