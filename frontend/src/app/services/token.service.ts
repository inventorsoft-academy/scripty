import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private _auth: AuthService) { }

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

    decode(): string {
        const helper = new JwtHelperService();
        const decodeToken = helper.decodeToken(this.getAccessToken());
        return decodeToken;
    }

    isTokenActive() {
      if (this._auth.isAuthenticated()) {
          let expiration: any = this.decode();
          expiration = expiration.exp * 1000;
          return new Date(expiration).valueOf() - 60000 > new Date().valueOf();
          // return false;
      }
    }
}
