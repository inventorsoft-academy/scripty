import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPageComponent} from './admin-page.component';
import {AdminSidebarComponent} from './sidebar/sidebar.component';
import { AdminFooterComponent} from './footer/footer.component';
import {RoleGuardService} from "../../services/role-guard.service";

const routes: Routes = [
	{
        path: '',
        component: AdminPageComponent,
        canActivate: [RoleGuardService],
        data: {role: 'Admin'},
		children: [
			{
				path: '', component: AdminSidebarComponent
			},
			{
				path: 'users', component: AdminFooterComponent,
			},
			{
				path: 'reports', component: AdminFooterComponent
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
