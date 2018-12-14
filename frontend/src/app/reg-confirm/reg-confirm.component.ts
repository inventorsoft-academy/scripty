import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RegConfirmService} from './reg-confirm.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reg-confirm',
  templateUrl: './reg-confirm.component.html',
  styleUrls: ['./reg-confirm.component.scss']
})
export class RegConfirmComponent implements OnInit {
  token: string;

  constructor(private route: ActivatedRoute,
              private regConfirmService: RegConfirmService,
              private httpClient: HttpClient) { }

  ngOnInit() {
      this.route.queryParamMap.subscribe(queryParams => {
          this.token = queryParams.get('token');
          console.log(this.token);
          this.activateUser(this.token);
      });
  }

    activateUser(token: string) {
        this.httpClient.get('/api/registrationConfirm?token=' + token)
          .subscribe((data) => {
              console.log(data);
          });
  }
}
