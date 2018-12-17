import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegConfirmationService} from '../reg-confirmation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.scss']
})
export class ResendEmailComponent implements OnInit {
    form: FormGroup;

    constructor(private regConfirmationService: RegConfirmationService,
                private router: Router) {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email])
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        this.regConfirmationService.resendEmail(this.form.get('email').value)
            .subscribe(
                (response: Response) => {
                    if (response.response === 'Please complete the registration first!') {
                        console.log('Please complete the registration first!\nRedirecting to registration page...');
                        this.router.navigate(['registration']);
                        // redirect to registration page
                    } else {
                        console.log('Redirecting to login page...');
                        this.router.navigate(['login']);
                        // redirect to login page
                    }
                },
                (error) => {
                    console.log(error.error.response);
                }
            );
    }
}

export interface Response {
    response: string;
}
