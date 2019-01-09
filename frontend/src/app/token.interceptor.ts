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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ2MDA1NDk2LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNjQ0MmI5MzMtOWZkOC00MTU5LWJhNjQtYzEyMDhkYjQ5YTk1IiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.Hj7IeHnCAZo1GZ8-SsiKvab0K_7kjXz9-l7PStBywv4",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXRpIjoiNjQ0MmI5MzMtOWZkOC00MTU5LWJhNjQtYzEyMDhkYjQ5YTk1IiwiZXhwIjoxNTQ2MDE4OTk2LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiYzY0OWE3Y2UtNWZkYy00MmM4LTk1ZjQtNGE3MWMxODhiMGU2IiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.XVdk_rh8fZaQTa8y57rqf_mP3irxjk0cC_smn1l5zjU",
                "expires_in": 899,
                "scope": "read write",
                "jti": "6442b933-9fd8-4159-ba64-c1208db49a95"
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
