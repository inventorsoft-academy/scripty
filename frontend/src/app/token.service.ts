import {Injectable} from '@angular/core';
import {Token} from './token';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    static getTokenData(): Token {
        return JSON.parse(localStorage.getItem('token'));
    }

    static setTokenData(token: Token) {
        localStorage.setItem('token', JSON.stringify(token));
    }
}
