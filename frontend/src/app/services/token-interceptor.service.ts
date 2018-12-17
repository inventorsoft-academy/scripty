import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpResponse,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // req = req.clone({
      //     setHeaders: {
      //         Authorization: `Bearer ${this.auth.getToken()}`
      //     }
      // });
        return next.handle(req);
    }
}
