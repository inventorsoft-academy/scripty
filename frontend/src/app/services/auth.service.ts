import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _registerUrl = 'http://192.168.99.100:8090/registration';
    private _loginUrl = 'http://jwtclientid:jwtClientSecret@192.168.99.100:8090/oauth/token';
    private _tokenUrl = '';

    public getToken(): string {
        console.log(localStorage.getItem('access_token'));
        return localStorage.getItem('access_token');
    }
    public isAuthenticated(): boolean {
        const token = this.getToken();
        // return a boolean reflecting
        // whether or not the token is expired
        // return tokenNotExpired(null, token);
    }
    constructor(private http: HttpClient) {
    }

    registerUser(user) {
        return this.http.post<any>(this._registerUrl, user);
    }
    loginUser(credentials) {
        return this.http.post<any>(this._loginUrl, credentials);
    }
}
