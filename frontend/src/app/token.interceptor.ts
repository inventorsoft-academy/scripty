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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ1OTk2NDkwLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNjQ1ZWU0MDktOTc0ZC00Yjc5LWJhN2YtYzk0NzQ4MWZkM2FkIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.BNOVOiPD9VFamdMVCf7tbW3JKLl-5-mKMeowf8Vg8ug",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXRpIjoiNjQ1ZWU0MDktOTc0ZC00Yjc5LWJhN2YtYzk0NzQ4MWZkM2FkIiwiZXhwIjoxNTQ2MDA5OTkwLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiYmM2ZWFjYzUtNjZlOC00NThmLTg1YmItNmI5MjdkMTVjYjVhIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.Q3TLv3EbYFpmN82O8LVeTyO_CEZTggqwAx_zMwVLItM",
                "expires_in": 899,
                "scope": "read write",
                "jti": "645ee409-974d-4b79-ba7f-c947481fd3ad"
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
