import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ResetPassService {

    private myHttpClient: HttpClient;
    constructor(private httpClient: HttpClient,
                private handler: HttpBackend) {
        this.myHttpClient = new HttpClient(this.handler);
    }

    sendResetLink(email: string) {
        return this.myHttpClient.post('api/user/sendPasswordReset', {
            'email': email
        });
    }

    setNewPassword(email: string, password: string, token: string) {
        return this.myHttpClient.put(`api/users/${email}/forgot-password/${token}`, {
            'password': {
                'matchingPassword': password,
                'password': password
            },
            'validPassword': password
        });
    }
}
