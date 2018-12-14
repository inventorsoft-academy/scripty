import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectsComponent} from './projects.component';
import {ProjectComponent} from './project/project.component';
import {ProjectsListComponent} from './projects-list/projects-list.component';


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
                path: 'list',
                component: ProjectsListComponent,
                data: {title: 'Projects list'}
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(projectRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProjectsRoutingModule {
}
