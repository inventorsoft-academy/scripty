import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthorized: boolean;
    isOpen: boolean;
    @Output() sidebarIsOpen = new EventEmitter<boolean>();

    constructor(public _authService: AuthService) {
    }

    ngOnInit() {
        this.isAuthorized = false;
        this.isOpen = false;
        this.openNav();
    }

    signIn() {
        this.isAuthorized = true;
    }

    logOut() {
        this.isAuthorized = false;
    }

    openNav() {
        this.isOpen = !this.isOpen;
        this.sidebarIsOpen.emit(this.isOpen);
    }
}
