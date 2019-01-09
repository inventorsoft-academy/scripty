import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPassService} from '../../../services/reset-pass.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-send-link',
    templateUrl: './send-link.component.html',
    styleUrls: ['./send-link.component.scss']
})
export class SendLinkComponent {
    form: FormGroup;

    constructor(private resetPassService: ResetPassService,
                private router: Router) {
        this.form = new FormGroup({
           email: new FormControl(null, [Validators.required, Validators.email])
        });
    }

    onSubmit() {
        this.resetPassService.sendResetLink(this.form.get('email').value)
            .subscribe(
                response => {
                    console.log('If you have entered the correct email, we will send you a message with confirmation link.');
                    this.router.navigate(['/']);
                },
                error => {
                    console.log(error);
                }
            );
    }
}
