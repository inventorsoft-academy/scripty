import {Injectable} from '@angular/core';
import {TokenService} from './token.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    public isAuthenticated() {
        return localStorage.getItem('access_token') != null;
    }
}
