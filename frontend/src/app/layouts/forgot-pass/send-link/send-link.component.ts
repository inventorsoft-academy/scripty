import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPassService} from '../../../services/reset-pass.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../toast.service';

@Component({
    selector: 'app-send-link',
    templateUrl: './send-link.component.html',
    styleUrls: ['./send-link.component.scss']
})
export class SendLinkComponent {
    form: FormGroup;

    constructor(private resetPassService: ResetPassService,
                private toast: ToastService,
                private router: Router) {
        this.form = new FormGroup({
           email: new FormControl(null, [Validators.required, Validators.email])
        });
    }

    onSubmit() {
        this.resetPassService.sendResetLink(this.form.get('email').value)
            .subscribe(
                () => {
                    this.toast.info('If you have entered the correct email, we will send you a message with confirmation link.');
                    this.router.navigate(['/']);
                },
                error => {
                    this.toast.error(error);
                }
            );
    }
}
