import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Mock} from './mock';
// import {HttpHeaders} from '@angular/common/http';
// import {Mock} from './mock';
// import {Observable} from 'rxjs';

// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//     })
// };


@Injectable({
    providedIn: 'root'
})
export class MockService {

    constructor(private http: HttpClient) {
    }

    setMock(data: Mock) {
        console.log(data);
        return this.http.post('/mock-requests', data);
    }
}
