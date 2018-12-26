import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _auth: AuthService,
                private _token: TokenService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request: any = req;
        if (this._token.isTokenActive()) {
            request = req.clone({
                headers: req.headers.set(
                    'Authorization',
                    'Bearer ' + localStorage.getItem('access_token')
                )
            });
            return next.handle(request);
        } else {
            return this._auth.refresh().pipe(mergeMap(() => {
                return next.handle(req.clone({
                    headers: req.headers.set(
                        'Authorization',
                        'Bearer ' + localStorage.getItem('access_token')
                    )
                }));
            }));
        }
        // return next.handle(request).pipe(
        //     catchError(err => {
        //         console.log('Error status code: ' + err.status);
        //         if (err.status === 401) {
        //             return this.auth.refresh().pipe(mergeMap(() => {
        //                 return next.handle(req.clone({
        //                     headers: req.headers.set(
        //                         'Authorization',
        //                         'Bearer ' + localStorage.getItem('access_token')
        //                     )
        //                 }));
        //             }));
        //         } else {
        //             return throwError(err);
        //         }
        //         // return throwError(err);
        //     })
        // );
    }
}
