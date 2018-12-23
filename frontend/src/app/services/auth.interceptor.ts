import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export class AuthInterceptor implements HttpInterceptor {

    constructor () {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // localStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        //     'eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjo' +
        //     'xNTQ1NDcxODI3LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiMDU' +
        //     '4MTkxOGQtNTU0ZS00OGI5LWFhM2QtN2Q5NGQyNTgzODY4IiwiY2xpZW50X2lkIjoi' +
        //     'and0Y2xpZW50aWQifQ.Qnl_UGZT4Hq9utzcWdg3tVd8yovA8qGybs9h6MgP08Y');

        if(localStorage.getItem('access_token')){
            const cloned = req.clone({
                headers: req.headers.set(
                    'Authorization',
                    'Bearer ' + localStorage.getItem('access_token')
                ),
            });
            return next.handle(cloned).pipe(
                catchError(err => {
                    console.log('Error status code: ' + err.status);
                    if(err.status === 401) {
                        //Refresh logic here
                    } else {

                    }
                    return throwError(err);
                })
            );
        }
        return next.handle(req).pipe(
            catchError(err => {
                console.log('Error status code: ' + err.status);
                if(err.status === 401) {
                    //Refresh logic here
                } else {

                }
                return throwError(err);
            })
        );
    }

    private getToken() {
        //get token here
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ1MDUwMTE5LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNDNkY2VlZjEtNTM1ZS00ODE5LWFlMjYtNmIzZTVjNTg0MWJkIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.L6SSW0KHrmZXBVHT16Szxxcte9F3-h0jL-XX5xZt-x8';
        return token;
    }
}