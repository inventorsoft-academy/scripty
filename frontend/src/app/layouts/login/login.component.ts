import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    emailError: string;


    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private _auth: AuthService) {
    }

    ngOnInit() {
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            grant_type: 'password'
        });
    }

    emailValidator() {
        const _field = this.loginForm.get('username');
        if (_field.hasError('required') && _field.touched) {
            this.emailError = 'This field should not be blank!';
            return true;
        } else if (_field.hasError('email') && _field.touched) {
            this.emailError = 'Please enter valid email';
            return true;
        }
        return false;
    }

    authUser() {
        this._auth.authUser(this.loginForm.value)
            .subscribe(
                res => {
                    localStorage.setItem('access_token', res.access_token);
                    localStorage.setItem('refresh_token', res.refresh_token);
                    localStorage.setItem('user', this.loginForm.value.username);
                    this.router.navigate(['/projects']);
                    console.log(localStorage.getItem('user'));
                },
                err => {
                    alert(err.error.error_description);
                }
            );
    }
}
