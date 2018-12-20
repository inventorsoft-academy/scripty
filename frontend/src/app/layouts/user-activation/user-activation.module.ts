import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserActivationComponent} from './user-activation.component';
import {RouterModule, Routes} from '@angular/router';
import {RegConfirmComponent} from './reg-confirm/reg-confirm.component';
import {ResendEmailComponent} from './resend-email/resend-email.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material-module';

const routes: Routes = [
    {
        path: '', component: UserActivationComponent, children: [
            {path: '', redirectTo: '/projects', pathMatch: 'full'},
            {path: 'confirm', component: RegConfirmComponent, data: {title: 'Registration confirmation'}},
            {path: 'resend', component: ResendEmailComponent, data: {title: 'Resend activation link'}}
        ]
    }
];

@NgModule({
    declarations: [
        UserActivationComponent,
        RegConfirmComponent,
        ResendEmailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserActivationModule {
}
