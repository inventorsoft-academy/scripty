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
    displayedColumns: string[] = ['id', 'name', 'email', 'reg-date', 'status'];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.getUsers(this.currentPage);
    }

    getUsers(page: number) {
        this.usersService.getUsers(page)
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

    showMore(page: number) {
        this.getUsers(page);
    }
}
