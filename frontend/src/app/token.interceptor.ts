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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ2NjAzODU5LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiYzc2N2ZmMWQtZGU3Zi00MjY1LTk1YzEtOGY1YjQwZTljZmVjIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.luJBfzFD97xNuYO2ZxA0pG6tevIqOdlMNT5ytE8lZk0",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXRpIjoiYzc2N2ZmMWQtZGU3Zi00MjY1LTk1YzEtOGY1YjQwZTljZmVjIiwiZXhwIjoxNTQ2NjE3MzU5LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiMTlhNTk0MzgtNDc4My00ZmZlLTg1NWMtODIwNzA5MThhZDFkIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.FOHeko159_twBRbBbWac2hEIDBX6FUJAwmogy9y2CC4",
                "expires_in": 899,
                "scope": "read write",
                "jti": "c767ff1d-de7f-4265-95c1-8f5b40e9cfec"
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
