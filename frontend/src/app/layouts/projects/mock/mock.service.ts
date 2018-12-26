import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Mock} from './mock';

@Injectable({
    providedIn: 'root'
})
export class MockService {

    constructor(private http: HttpClient) {
    }

    setMock(data: Mock) {
        return this.http.post('/mock-requests', data);
    }
}
