import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserActivationService} from '../user-activation.service';

@Component({
    selector: 'app-reg-confirm',
    templateUrl: './reg-confirm.component.html',
    styleUrls: ['./reg-confirm.component.scss']
})
export class RegConfirmComponent implements OnInit {
    token: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private userActivationService: UserActivationService) {
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
        this.userActivationService.activateUser(token)
            .subscribe(() => {
                    this.router.navigate(['login']);
                },
                (error) => {
                    if (error.status === 400 && error.error.response === 'Wrong link') {
                        this.router.navigate(['/']);
                    }
                    if (error.status === 400 && error.error.response === 'Time of user verification link has expired') {
                        this.router.navigate(['userActivation/resend']);
                    }
                });
    }
}
