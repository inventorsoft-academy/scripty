import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get('http://www.mocky.io/v2/5c21254b2e0000a0001e0cc8');
  }
}
