import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Mock} from './mock';
import {Observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};


@Injectable({
    providedIn: 'root'
})
export class MockService {
    usersUrl = 'https://api.github.com/users';

    constructor(private http: HttpClient) {
    }
    setMock(): Observable<Mock> {
        return this.http.get<Mock>(this.usersUrl)
            .pipe(
            );
    }
}
