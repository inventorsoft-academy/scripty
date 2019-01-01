import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {RefreshService} from './refresh.service';
import {Router} from '@angular/router';
import {ToastService} from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _auth: AuthService,
                private _token: TokenService,
                private _refresh: RefreshService,
                private _router: Router,
                private _toast: ToastService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request: any = req;
        if (this._token.isAccessActive() && this._token.isRefreshActive()) {
            request = req.clone({
                headers: req.headers.set(
                    'Authorization',
                    'Bearer ' + localStorage.getItem('access_token')
                )
            });
            return next.handle(request);
        } else if (!this._token.isAccessActive() && this._token.isRefreshActive()) {
            return this._refresh.refresh().pipe(mergeMap(() => {
                return next.handle(req.clone({
                    headers: req.headers.set(
                        'Authorization',
                        'Bearer ' + localStorage.getItem('access_token')
                    )
                }));
            }));
        } else if (!this._token.isRefreshActive()) {
            this._auth.logOut();
            this._toast.showError('Refresh Token Die! You need re-login');
            this._router.navigate(['/login']);

            return next.handle(request).pipe(
                catchError(err => {
                    return throwError(err);
                })
            );
        }
    }
}
