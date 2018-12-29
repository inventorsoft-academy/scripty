import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
    {
        path: 'projects',
        loadChildren: './layouts/projects/projects.module#ProjectsModule',
        data: {title: 'Projects'}
        },
    {
        path: 'admin',
        loadChildren: './layouts/admin-page/admin-page.module#AdminPageModule'
    },
    {
        path: '',
        redirectTo: '/projects', pathMatch: 'full'
    },
    {
        path: 'admin',
        loadChildren: './layouts/admin-page/admin-page.module#AdminPageModule',
        data: {title: 'Admin page'}
    },
    {
        path: 'userActivation',
        loadChildren: './layouts/user-activation/user-activation.module#UserActivationModule',
        data: {title: 'User activation'}
    },
    {
        path: 'user',
        loadChildren: './layouts/forgot-pass/forgot-pass.module#ForgotPassModule',
        data: {title: 'Reset password'}
    },
    {
        path: '**', redirectTo: '/projects'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes/*, { useHash: true }*/)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
