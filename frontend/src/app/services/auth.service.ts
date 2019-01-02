import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _registerUrl = '/public/api/registration';
    private _authUrl = '/public/api/oauth/token';
    isAuthorized: boolean;


    public getToken(): string {
        return localStorage.getItem('access_token');
    }

    public isAuthenticated() {
        const token = this.getToken();
        return token != null;
    }

    constructor(private http: HttpClient) { }

    registerUser(user) {
        return this.http.post<any>(this._registerUrl, user);
    }

    authUser(credentials) {
        const headers = new HttpHeaders()
            .set('Authorization', `Basic ${btoa(environment.clientId + ':' + environment.clientSecret)}`);
        return this.http.post<any>(this._authUrl, credentials, {headers});
    }

    logOut() {
        this.isAuthorized = false;
        localStorage.clear();
    }
}
