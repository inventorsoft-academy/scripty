import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserActivationService} from '../user-activation.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../toast.service';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.scss']
})
export class ResendEmailComponent {
    form: FormGroup;

    constructor(private userActivationService: UserActivationService,
                private toast: ToastService,
                private router: Router) {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email])
        });
    }

    onSubmit() {
        this.userActivationService.resendEmail(this.form.get('email').value)
            .subscribe(
                (response: Response) => {
                    if (response && response.response === 'Please complete the registration first!') {
                        this.router.navigate(['signup']);
                    } else {
                        this.router.navigate(['login']);
                    }
                },
                (error) => {
                    this.toast.error(error);
                }
            );
    }
}

export interface Response {
    response: string;
}
