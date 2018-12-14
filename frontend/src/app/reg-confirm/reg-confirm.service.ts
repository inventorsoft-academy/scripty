import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegConfirmService {

  constructor(private httpClient: HttpClient) { }

  activateUser(token: string) {
    return this.httpClient.get('http://localhost:8080/registrationConfirm?token=' + token);
  }
}
