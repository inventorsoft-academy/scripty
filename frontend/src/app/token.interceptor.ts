import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment as env} from '../environments/environment';
import {TokenService} from './token.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tokenData = TokenService.getTokenData();
        let cloned = null;
        if (!req.url.includes(env.API_URL)) {
            cloned = req.clone({url: env.API_URL + req.url});
        } else {
            cloned = req.clone();
        }
        console.log(tokenData);

        // todo false for developer
        if (tokenData && false) {
            cloned = cloned.clone(
                {
                    setHeaders: {
                        Authorization: `${tokenData.token_type} ${tokenData.access_token}`
                    }
                }
            );

            console.log(cloned);

            return next.handle(cloned);
        } else {
            // todo for developer
            /* tslint:disable */
            tokenData = {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ2NjMzMDM4LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOTZmYmQ4YTQtYmU5Mi00YTVjLWI1N2MtM2YzMmNhYjIzZTYzIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.4lTLf_gFKzN0fvJgFBbRGefncr8RrdfFOR3pULTAf2U",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXRpIjoiOTZmYmQ4YTQtYmU5Mi00YTVjLWI1N2MtM2YzMmNhYjIzZTYzIiwiZXhwIjoxNTQ2NjQ2NTM4LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiZmQ5NDczMWMtMWM3MS00Mzk5LTgwNjktZTdhMjFmNmQ4MDJjIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.hU9C7o0128XvB8g1TvR1TpmlqBaeP3Gzdhbd-TcAJuk",
                "expires_in": 899,
                "scope": "read write",
                "jti": "96fbd8a4-be92-4a5c-b57c-3f32cab23e63"
            };
            TokenService.setTokenData(
                tokenData
            );
            /* tslint:enable */
            cloned = cloned.clone({
                setHeaders: {
                    Authorization: `${tokenData.token_type} ${tokenData.access_token}`
                }
            });
            console.log(cloned);
            return next.handle(cloned);
        }


    }
}
