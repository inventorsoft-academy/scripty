import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

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

    constructor() {
    }

    ngOnInit() {
        this.isAuthorized = localStorage.getItem('access_token') !== null;
        this.isOpen = false;
        this.openNav();
        this.user = localStorage.getItem('user');
    }

    signIn() {
        this.isAuthorized = true;
    }

    logOut() {
        this.isAuthorized = false;
        localStorage.clear();
    }

    openNav() {
        this.isOpen = !this.isOpen;
        this.sidebarIsOpen.emit(this.isOpen);
    }
}
