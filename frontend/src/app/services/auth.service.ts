import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _registerUrl = 'http://192.168.99.100:8090/registration';

    constructor(private http: HttpClient) {
    }

    registerUser(user) {
        return this.http.post<any>(this._registerUrl, user);
    }
}
