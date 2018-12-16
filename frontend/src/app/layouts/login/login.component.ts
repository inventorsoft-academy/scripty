import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    credentials = {
      username: 'user@test.co',
        password: 'jwtpass',
        grant_type: 'password'
    };

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }
    loginUser() {
        this._auth.loginUser(this.credentials)
            .subscribe(
                res => {
                  console.log(res);
                  localStorage.setItem('access_token', res.access_token);
                  localStorage.setItem('refresh_token', res.refresh_token);
                },
                err => console.log(err)
            );
    }

}
