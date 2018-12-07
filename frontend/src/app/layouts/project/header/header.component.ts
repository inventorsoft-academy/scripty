import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	authorized: boolean;
	isOpen: boolean;

	constructor(private _authService: AuthService) {
	}

	ngOnInit() {
		this.authorized = false;
		this.isOpen = false;
	}

	singIn() {
		this.authorized = true;
		this._authService.login();
	}

	logOut() {
		this.authorized = false;
		// this._authService.logout();
	}

	openNav() {
		this.isOpen = !this.isOpen;
	}


}
