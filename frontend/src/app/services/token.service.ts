import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

    getAccessToken() {
      return localStorage.getItem('access_token');
    }

    setAccessToken(access_token: string) {
      localStorage.setItem('access_token', access_token);
    }

    getRefreshToken() {
      return localStorage.getItem('refresh_token');
    }

    setRefreshToken(refresh_token: string) {
      localStorage.setItem('refresh_token', refresh_token);
    }

    decode() {
        const helper = new JwtHelperService();
        const decodeToken = helper.decodeToken(this.getAccessToken());
        return decodeToken;
    }

    isTokenActive() {
        let expiration = this.getAccessToken();
        expiration = this.decode().exp * 1000;
        // return new Date(expiration).valueOf() - 60000 > new Date().valueOf();
        return false;
    }
}
