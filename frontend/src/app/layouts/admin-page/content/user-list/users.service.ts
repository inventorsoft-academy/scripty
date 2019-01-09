import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private httpClient: HttpClient) {
    }

    getUsers(page: number, email = '') {
        return this.httpClient.get(`/api/users?page=${page}&size=5&email=${email}`);
    }

    changeUserStatus(id: number, status: boolean) {
        return this.httpClient.put(`/api/users/${id}?status=${status}`, null);
    }
}
