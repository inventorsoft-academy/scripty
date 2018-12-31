import {Component} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
    Validators
} from '@angular/forms';
import {ToastService} from '../../services/toast.service';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registrationForm: FormGroup;
    errorMatcher = new CrossFieldErrorMatcher();
    emailError: string;
    nameError: string;
    passwordError: string;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private  _auth: AuthService,
        private _toast: ToastService
    ) {
        this.initForm();
        // redirect to home if already logged in
        // if (this._auth.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    initForm() {

        this.registrationForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            firstName: [
                '', [Validators.required, Validators.minLength(2),
                    Validators.maxLength(60),
                    Validators.pattern('^[a-zA-Z]+$')]],
            lastName: ['', [Validators.required, Validators.minLength(2),
                Validators.maxLength(60),
                Validators.pattern('^[a-zA-Z]+$')]],
            password: this._formBuilder.group({
                password: ['', [
                    Validators.required, Validators.minLength(6),
                    Validators.maxLength(16),
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,16}$')
                ]],
                matchingPassword: ['']
            }, {validator: this.MatchPassword})
        });
    }

    emailValidator() {
        const _field = this.registrationForm.get('email');
        if (_field.hasError('required') && _field.touched) {
            this.emailError = 'This field should not be blank!';
            return true;
        } else if (_field.hasError('email') && _field.touched) {
            this.emailError = 'Please enter valid email';
            return true;
        }
        return false;
    }

    nameValidator(name) {

        const _field = this.registrationForm.get(name);
        if (_field.hasError('required') && _field.touched) {
            this.nameError = 'This field should not be blank!';
            return true;
        } else if (_field.hasError('minlength') && _field.touched) {
            this.nameError = 'Your name is too short';
            return true;
        } else if (_field.hasError('maxlength') && _field.touched) {
            this.nameError = 'Your name is too long';
            return true;
        } else if (_field.hasError('pattern') && _field.touched) {
            this.nameError = 'No whitespaces or special characters allowed';
            return true;
        }
        return false;
    }

    passwordValidator() {
        const _field = this.registrationForm.get('password.password');
        if (_field.hasError('required') && _field.touched) {
            this.passwordError = 'This field should not be blank!';
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

    MatchPassword(form: FormControl) {
        const condition = form.get('password').value !== form.get('matchingPassword').value;
        return condition ? {passwordsDoNotMatch: true} : null;
    }
    registerUser() {
        this._auth.registerUser(this.registrationForm.value)
            .subscribe(
                res => {
                    this._toast.showInfo('Confirm your email address in the letter from us!');
                    this.router.navigate(['/login']);
                },
                err => {
                    this._toast.showError(err);
                }
            );
    }
}
