import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResetPassService} from '../../../services/reset-pass.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-confirm-pass',
    templateUrl: './confirm-pass.component.html',
    styleUrls: ['./confirm-pass.component.scss']
})
export class ConfirmPassComponent implements OnInit {
    token: string;
    passwordError: string;
    form: FormGroup;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private resetPassService: ResetPassService) {
        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.email,
                Validators.required]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(16),
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,16}$')])
        });
    }

    ngOnInit() {
        this.route.queryParamMap
            .subscribe(
                (queryParams) => {
                    this.token = queryParams.get('token');
                    console.log(this.token);
                });
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
}
