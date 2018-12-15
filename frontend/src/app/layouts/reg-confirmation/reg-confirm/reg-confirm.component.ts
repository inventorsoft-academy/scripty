import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegConfirmationService} from '../reg-confirmation.service';

@Component({
  selector: 'app-reg-confirm',
  templateUrl: './reg-confirm.component.html',
  styleUrls: ['./reg-confirm.component.scss']
})
export class RegConfirmComponent implements OnInit {
    token: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private regConfirmationService: RegConfirmationService) {
    }

    ngOnInit() {
        this.route.queryParamMap
            .subscribe(
                (queryParams) => {
                    this.token = queryParams.get('token');
                    this.activateUser(this.token);
                });
    }

    activateUser(token: string) {
        this.regConfirmationService.activateUser(token)
            .subscribe((data) => {
                    console.log(data, 'Redirecting to login page...');
                    // redirect to login page
                },
                (error) => {
                    console.log(error, 'It`s error Johnny!');
                    if (error.status === 400 && error.error.response === 'Wrong link') {
                        console.log('Wrong link');
                        // error 'Wrong link'
                    }
                    if (error.status === 400 && error.error.response === 'Time of user verification link has expired') {
                        console.log('Resend token');
                        this.router.navigate(['registrationConfirmation/resend']);
                    }
                });
    }
}
