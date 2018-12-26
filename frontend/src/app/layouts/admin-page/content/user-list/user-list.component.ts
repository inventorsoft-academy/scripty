import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {User} from '../../../../models/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: Array<User>;
    displayedColumns: string[] = ['id', 'name', 'email', 'reg-date'];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService.getUsers()
            .subscribe(
                (response: Array<User>) => {
                    this.users = response;
                    console.log(this.users);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

}
