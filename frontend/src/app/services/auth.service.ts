import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import {decode} from 'punycode';
import * as jwt_decode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5' +
    'NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTm' +
    'FtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQ' +
    'WRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE';

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

    loginAdmin(): void {
        this.http.get('https://api.github.com/users').subscribe((res: Response) => {
            console.log(res);
            this.token = res;
        });
        localStorage.setItem('token', token);
        this._router.navigate(['/admin/users']);
    }

    login(): void {
        localStorage.setItem('token', token);
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
