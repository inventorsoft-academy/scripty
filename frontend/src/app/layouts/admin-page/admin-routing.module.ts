import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPageComponent} from './admin-page.component';
import {AdminSidebarComponent} from './sidebar/sidebar.component';
import {AdminFooterComponent} from './footer/footer.component';
import {RoleGuardService} from '../../services/role-guard.service';
import {UserListComponent} from './content/user-list/user-list.component';
import {TicketListComponent} from './content/ticket-list/ticket-list.component';

const routes: Routes = [
    {
        path: '',
        component: AdminPageComponent,
        canActivate: [RoleGuardService],
        data: {role: 'ROLE_ADMIN'},
        children: [
            {
                path: '', component: AdminSidebarComponent,
                data: {title: 'Admin page'}
            },
            {
                path: 'users', component: UserListComponent,
                data: {title: 'User list'}
            },
            {
                path: 'reports', component: TicketListComponent,
                data: {title: 'Reports'}
            },
        ],
    },
    {
        path: '**', redirectTo: '/admin'
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
