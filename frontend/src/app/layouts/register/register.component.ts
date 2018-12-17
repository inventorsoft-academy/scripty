import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

// import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registrationForm: FormGroup;
    _loading = false;
    _submitted = false;


    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private  _auth: AuthService,
        // private userService: UserService,
        // private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // if (this._auth.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.registrationForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            password: {
                password: '123456Df*',
                matchingPassword: '123456Df*'
            }
        });
    }

    registerUser() {

        this._auth.registerUser(this.registrationForm.value)
            .subscribe(
                res => {
                    console.log(res, this.registrationForm.value);
                    this.router.navigate(['/login']);
                },
                err => console.log(err, this.registrationForm.value)
            );
    }

}
