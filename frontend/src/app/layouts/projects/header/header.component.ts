import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthorized: boolean;
    isOpen: boolean;
    user: string;
    @Output() sidebarIsOpen = new EventEmitter<boolean>();

    constructor(private _auth: AuthService,
                private  router: Router) { }


    ngOnInit() {
        this._auth.isAuthorized = localStorage.getItem('access_token') !== null;
        this.isAuthorized = this._auth.isAuthorized;
        this.isOpen = false;
        this.openNav();
        this.user = localStorage.getItem('user');
    }

    signIn() {
        this._auth.isAuthorized = true;
    }

    logOut() {
        this._auth.isAuthorized = false;
        this.isAuthorized = false;
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    openNav() {
        this.isOpen = !this.isOpen;
        this.sidebarIsOpen.emit(this.isOpen);
    }
}
