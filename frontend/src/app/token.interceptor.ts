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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ2NjI4OTU0LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiN2FlMDlhY2QtZmY0Yy00N2FlLWExMDktM2Y5OWZiYjE3NDA3IiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.qFOgNhZXKOTmzAGIdXnAogFiKXwDJuhaVlgX_5zZ6nA",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXRpIjoiN2FlMDlhY2QtZmY0Yy00N2FlLWExMDktM2Y5OWZiYjE3NDA3IiwiZXhwIjoxNTQ2NjQyNDU0LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNGU5YTNmNDAtOWU0MS00NmZkLWE2ZTctYTEwOTQyNjM5ZTM0IiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.Y2Skzevj48FrnBYTpL8EVLZMBvsCM2qZckqOudxbPCM",
                "expires_in": 899,
                "scope": "read write",
                "jti": "7ae09acd-ff4c-47ae-a109-3f99fbb17407"
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
