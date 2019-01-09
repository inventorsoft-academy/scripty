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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJhZG1pbkB0ZXN0LmNvIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU0NzA0MzQ2NSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiIzNjE4ZmVmMC1kNzE5LTQyMzItOWVhYy0zNWViMDYyM2U2OTQiLCJjbGllbnRfaWQiOiJqd3RjbGllbnRpZCJ9.CfSkS1nJNd1EaODPNJtN99JaY1B1XLXjG9THu6ew75U",
                "token_type": "bearer",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJhZG1pbkB0ZXN0LmNvIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImF0aSI6IjM2MThmZWYwLWQ3MTktNDIzMi05ZWFjLTM1ZWIwNjIzZTY5NCIsImV4cCI6MTU0NzA1Njk2NSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiI4Yzg0NDdhMC0zOTIzLTQ5ZTAtYWZiMC0wNzhhZmJmZjY0M2UiLCJjbGllbnRfaWQiOiJqd3RjbGllbnRpZCJ9.GHjzbO7D5M0iprQ_t5tFAaV3eTNm4VQMbWf0jXEOW6E",
                "expires_in": 899,
                "scope": "read write",
                "jti": "3618fef0-d719-4232-9eac-35eb0623e694"
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
