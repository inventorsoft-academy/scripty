import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export class AuthInterceptor implements HttpInterceptor {

    constructor () {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const cloned = req.clone({
            headers: req.headers.set(
                'Authorization',
                'Bearer ' + this.getToken()
            )
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

    private getToken() {
        //get token here
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ1MDUwMTE5LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNDNkY2VlZjEtNTM1ZS00ODE5LWFlMjYtNmIzZTVjNTg0MWJkIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.L6SSW0KHrmZXBVHT16Szxxcte9F3-h0jL-XX5xZt-x8';
        return token;
    }
}