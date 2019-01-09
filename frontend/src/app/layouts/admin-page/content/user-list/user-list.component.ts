import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {User} from '../../../../models/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users = [];
    currentPage = 0;
    totalElements: number;
    searchEmail = '';
    displayedColumns: string[] = ['id', 'name', 'email', 'reg-date', 'status'];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.getUsers(this.currentPage, this.searchEmail);
    }

    getUsers(page: number, email: string) {
        this.usersService.getUsers(page, email)
            .subscribe(
                (response) => {
                    this.users = this.users.concat(response['content']);
                    this.totalElements = response['totalElements'];
                    this.currentPage++;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    showMore(page: number, email = '') {
        this.getUsers(page, email);
    }

    searchByEmail(email: string ) {
        this.searchEmail = email;
        this.currentPage = 0;
        this.users = [];
        this.getUsers(this.currentPage, this.searchEmail);
    }

    changeUserStatus(user: User) {
        this.usersService.changeUserStatus(user.id, !user.enabled)
            .subscribe(
                () => {
                    user.enabled = !user.enabled;
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
