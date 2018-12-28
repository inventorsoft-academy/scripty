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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ1OTkyNDYzLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNzExMWNhNGYtODliMy00ZDVhLTk0ZjEtZTEzMWRmNTM3NWFlIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.-MnIuz_G0JQXLrTjS5T7JvtLAJ4e_UjvO8AvL_lHAsU",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXRpIjoiNzExMWNhNGYtODliMy00ZDVhLTk0ZjEtZTEzMWRmNTM3NWFlIiwiZXhwIjoxNTQ2MDA1OTYzLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiYjA2MzBlZWEtN2QyYS00NDY2LWE2YWItYjZkOTJkYzZhNTViIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.IdosxiO6CEa1HfmWEpcST5JfaEmOMHeM0ZL5NanmShA",
                "expires_in": 899,
                "scope": "read write",
                "jti": "7111ca4f-89b3-4d5a-94f1-e131df5375ae"
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
