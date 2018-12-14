import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import {decode} from 'punycode';
import * as jwt_decode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';

const tokenAdmin = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token = null;

    constructor(
        private _router: Router,
        private http: HttpClient,
    ) {
    }

    // Clear local storage if needs
    clear(): void {
        localStorage.clear();
    }

    // simulate valid JWT token
    isTokenExpired(): boolean {
        return false;
    }

    isAuth(): boolean {
        return localStorage.getItem('token') != null && !this.isTokenExpired();
    }

    login(): void {
        // TO DO ur login logic

        localStorage.setItem('token', tokenAdmin);
        this._router.navigate(['/projects']);
    }

    logout(): void {
        this.clear();

        this._router.navigate(['/projects']);
    }

    decode() {
        const helper = new JwtHelperService();
        const decodeToken = helper.decodeToken(localStorage.getItem('token'));
        return decodeToken;
    }
}