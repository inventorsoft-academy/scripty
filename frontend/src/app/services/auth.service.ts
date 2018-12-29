import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders, HttpParams, HttpXhrBackend, XhrFactory} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _registerUrl = 'http://192.168.99.100:8090/registration';
    private _authUrl = 'http://jwtclientid:jwtClientSecret@192.168.99.100:8090/oauth/token';
    private http: HttpClient;

    public getToken(): string {
        console.log(localStorage.getItem('access_token'));
        return localStorage.getItem('access_token');
    }
    public isAuthenticated() {
        const token = this.getToken();
        return token != null ? true : false;
    }
    constructor(private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    registerUser(user) {
        return this.http.post<any>(this._registerUrl, user);
    }
    authUser(credentials) {
        const headers = new HttpHeaders()
            .set('Authorization', `Basic ${btoa(environment.clientId + ':' + environment.clientSecret)}`);
        return this.http.post<any>('api/oauth/token', credentials, {headers});
    }
}
