import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectsComponent} from './projects.component';
import {ProjectComponent} from './project/project.component';
import {AdminPageComponent} from '../admin-page/admin-page.component';
import {RoleGuardService} from '../../services/role-guard.service';
import {AuthGuardService} from '../../services/auth-guard.service';
import {MockComponent} from './mock/mock.component';


const projectRoutes: Routes = [
    {
        path: '',
        component: ProjectsComponent,
        children: [
            {
                path: '',
                component: ProjectComponent,
                data: {title: 'Your project'}
            },
            {
                path: 'project',
                component: ProjectComponent,
                data: {title: 'Your project'}
            },
            {
                path: 'mock',
                component: MockComponent,
                data: {title: 'Your mock'}
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(projectRoutes)
    ],
    providers: [AuthGuardService, RoleGuardService],
    exports: [
        RouterModule
    ]
})
export class ProjectsRoutingModule {
}
