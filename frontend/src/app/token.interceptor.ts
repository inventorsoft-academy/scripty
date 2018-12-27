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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJkbDExMDIxOTk3QGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1NDU4MjY2NzIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiI5NGEyMWQxZS1iN2NiLTQ3NDgtYTEyZC1mYWZjYjg5M2I2OWIiLCJjbGllbnRfaWQiOiJqd3RjbGllbnRpZCJ9.mn1A3e1515DRvYCVEM0rgQWGx4Wvnyfe_QnSuFnE0Ig",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJkbDExMDIxOTk3QGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiI5NGEyMWQxZS1iN2NiLTQ3NDgtYTEyZC1mYWZjYjg5M2I2OWIiLCJleHAiOjE1NDU4NDAxNzIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiI3OWFjMDAxZi0zMTNjLTRkMzYtOTNjMi1mYTI1ZTc5Njg2ZmEiLCJjbGllbnRfaWQiOiJqd3RjbGllbnRpZCJ9.8iK7fyhHf3UfeZ8RHnaIg_DIIkath3c0rkjDwDwcrpI",
                "expires_in": 899,
                "scope": "read write",
                "jti": "94a21d1e-b7cb-4748-a12d-fafcb893b69b"
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
