import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private httpClient: HttpClient) {
    }

    getUsers(page: number) {
        return this.httpClient.get(`/api/api/users?page=${page}&size=5`);
    }
}
