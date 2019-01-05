import {Injectable} from '@angular/core';
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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJhZG1pbkB0ZXN0LmNvIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU0NjY4NzkyMywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiI1NzdjNTQwMy1iOWRmLTQzNjUtOTkxZC01NzZlYjBkMjhiYTMiLCJjbGllbnRfaWQiOiJqd3RjbGllbnRpZCJ9.CRGGRVbAT8tUkBE3PsAfDQQCvieV1KNM92PX9PwQK28",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJhZG1pbkB0ZXN0LmNvIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImF0aSI6IjU3N2M1NDAzLWI5ZGYtNDM2NS05OTFkLTU3NmViMGQyOGJhMyIsImV4cCI6MTU0NjcwMTQyMywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiIyOTA4M2VhMi1iZTliLTQ0OWMtOGUzMC03NjRkZTU3NjY5NDAiLCJjbGllbnRfaWQiOiJqd3RjbGllbnRpZCJ9.0dbAHquyjiQB3rgnsQMB0s1DZL0xtJsbYctJX1yNwjI",
                "expires_in": 899,
                "scope": "read write",
                "jti": "577c5403-b9df-4365-991d-576eb0d28ba3"
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
