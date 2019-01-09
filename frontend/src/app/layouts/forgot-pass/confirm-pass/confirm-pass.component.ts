import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResetPassService} from '../../../services/reset-pass.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

@Component({
    selector: 'app-confirm-pass',
    templateUrl: './confirm-pass.component.html',
    styleUrls: ['./confirm-pass.component.scss']
})
export class ConfirmPassComponent implements OnInit {
    token: string;
    email: string;
    passwordError: string;
    form: FormGroup;
    errorMatcher = new CrossFieldErrorMatcher();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private resetPassService: ResetPassService) {
        this.form = new FormGroup({
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(16),
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,16}$')]),
            matchingPassword: new FormControl(null)
        }, {validators: this.matchPassword});
    }

    ngOnInit() {
        this.email = this.route.snapshot.params['email'];
        this.token = this.route.snapshot.params['token'];
    }

    passwordValidator() {
        const _field = this.form.get('password');
        if (_field.hasError('required') && _field.touched) {
            this.passwordError = 'This field should not be blank';
            return true;
        } else if (_field.hasError('minlength') && _field.touched) {
            this.passwordError = 'Password should be more than 6 characters';
            return true;
        } else if (_field.hasError('maxlength') && _field.touched) {
            this.passwordError = 'Password should be less than 16 characters';
            return true;
        } else if (_field.hasError('pattern') && _field.touched) {
            this.passwordError = 'Password should contain at least one number, special character and letter';
            return true;
        }
        return false;
    }

    matchPassword(group: FormGroup) {
        const pass = group.get('password').value;
        const confirmPass = group.get('matchingPassword').value;

        return pass === confirmPass ? null : {'matchError': true};
    }

    onSubmit() {
        this.resetPassService.setNewPassword(
            this.email,
            this.form.get('password').value,
            this.token)
            .subscribe(
                () => {
                    console.log('Password changed');
                    this.router.navigate(['login']);
                },
                error => {
                    console.log(error);
                }
            );
    }
}

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}
