import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders, HttpParams, HttpXhrBackend, XhrFactory} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, ReplaySubject} from 'rxjs';
import {BrowserXhr} from "@angular/http";
import {tap} from "rxjs/operators";

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
        // return a boolean reflecting
        // whether or not the token is expired
        // return tokenNotExpired(null, token);
    }
    constructor(private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    registerUser(user) {
        return this.http.post<any>(this._registerUrl, user);
    }
    authUser(credentials) {
        return this.http.post<any>(this._authUrl, credentials);
    }

    refresh (): Observable {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
            // .set('Authorization', `Basic ${btoa(env.clientId + ':'+ env.secret)}`);
        return this.http.post('http://jwtclientid:jwtClientSecret@192.168.99.100:8090/oauth/token',
            {
                grant_type: 'refresh_token',
                refresh_token: localStorage.getItem('refresh_token')
            }, { headers })
            .pipe(tap((res: any) => {
                    console.log('REFRESHED SUCCESS!');
                    localStorage.setItem('access_token', res.access_token);
                    localStorage.setItem('refresh_token', res.refresh_token);
                }));
    }
}
