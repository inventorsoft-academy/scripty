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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ2NjQ2NzU4LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiODdjNGRkZDItY2IyNi00OWFhLWExODAtYTMzMTA0NGJiYTEyIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.G5UcswNPr8nSjh3H4teraLbZbl3-y6olbXlbwoEIzEE",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXRpIjoiODdjNGRkZDItY2IyNi00OWFhLWExODAtYTMzMTA0NGJiYTEyIiwiZXhwIjoxNTQ2NjYwMjU4LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNGRhMjUzYjQtNmZiMi00MDhlLTlhNTItOGYxZGU0NTBhNzUyIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ._vK_0N8zB-yw7u5MhkBej9Poauq5WWWSdiwVo1WWypw",
                "expires_in": 899,
                "scope": "read write",
                "jti": "87c4ddd2-cb26-49aa-a180-a331044bba12"
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
