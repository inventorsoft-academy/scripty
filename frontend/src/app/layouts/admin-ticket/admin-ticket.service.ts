import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminTicketService {

  constructor(private httpClient: HttpClient) {}

  sendReport(title: string, description: string, file: string) {
      return this.httpClient.post('http://www.mocky.io/v2/5c1631502e0000541637c739', {
          title: title,
          description: description,
          file: file
      });
  }
}
