import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AdminTicketService} from './admin-ticket.service';
import {ToastService} from '../../toast.service';


@Component({
    selector: 'app-admin-ticket',
    templateUrl: './admin-ticket.component.html',
    styleUrls: ['./admin-ticket.component.scss']
})
export class AdminTicketComponent {
    form: FormGroup;

    constructor(private router: Router,
                private toast: ToastService,
                private adminTicketService: AdminTicketService) {
        this.form = new FormGroup({
            title: new FormControl(null, [Validators.required,
                Validators.maxLength(50)]),
            description: new FormControl(null, [Validators.required,
                Validators.maxLength(255)])
        });
    }

    onSubmit() {
        this.adminTicketService.sendReport(
            this.form.get('title').value,
            this.form.get('description').value
        ).subscribe(
            () => {
                this.toast.success('Message sent!\nThank you for making us better!');
                this.router.navigateByUrl('/');
            },
            (error) => {
                this.toast.error(error);
            }
        );
    }
}
