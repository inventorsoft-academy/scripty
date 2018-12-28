import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders, HttpParams, HttpXhrBackend, XhrFactory} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, ReplaySubject} from 'rxjs';
import {BrowserXhr} from "@angular/http";
import {tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _registerUrl = 'http://localhost/registration';
    private _authUrl = 'http://jwtclientid:jwtClientSecret@localhost:8090/oauth/token';
    private http: HttpClient;

    public getToken(): string {
        console.log(localStorage.getItem('access_token'));
        return localStorage.getItem('access_token');
    }
    public isAuthenticated() {
        const token = this.getToken();
        return token
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
}
