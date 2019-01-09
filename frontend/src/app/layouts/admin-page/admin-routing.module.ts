import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPageComponent} from './admin-page.component';
import {AdminSidebarComponent} from './sidebar/sidebar.component';
import {AdminFooterComponent} from './footer/footer.component';
import {TicketListComponent} from './content/ticket-list/ticket-list.component';
import {RoleGuardService} from '../../services/role-guard.service';

const routes: Routes = [
    {
        path: '',
        component: AdminPageComponent,
        canActivate: [RoleGuardService],
        data: {role: 'ROLE_ADMIN'},
        children: [
            {
                path: '', component: AdminSidebarComponent
            },
            {
                path: 'users', component: AdminFooterComponent,
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
