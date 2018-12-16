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
                return throwError(err);
            })
        );
    }

    private getToken() {
        //get token here
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ0OTUzODU0LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiMTJjOTA2YmYtOGExYy00NjI5LTljZmMtODYzYzEyYmM4ZGEzIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.2FsIfIKymNtSf1nV-pBIPslICp547IAkN1wSNDRt9w0';
        return token;
    }
}