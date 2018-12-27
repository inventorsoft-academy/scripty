import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {TokenService} from './token.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private customHttp: HttpClient;

  constructor(private httpBackend: HttpBackend,
              private token: TokenService) {
      this.customHttp = new HttpClient(httpBackend);
  }

    refresh (): Observable {

        const headers = new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', `Basic ${btoa(environment.clientId + ':' + environment.clientSecret)}`);
        return this.customHttp.post('api/oauth/token',
            {
                grant_type: 'refresh_token',
                refresh_token: this.token.getRefreshToken()
            }, { headers })
            .pipe(tap((res: any) => {
                console.log('REFRESH SUCCESS!');
                this.token.setAccessToken(res.access_token);
                this.token.setRefreshToken(res.refresh_token);
            }));
    }
}
