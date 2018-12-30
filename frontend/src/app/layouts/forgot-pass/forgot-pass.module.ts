import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material-module';
import {RouterModule, Routes} from '@angular/router';
import {ForgotPassComponent} from './forgot-pass.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SendLinkComponent} from './send-link/send-link.component';
import {ConfirmPassComponent} from './confirm-pass/confirm-pass.component';

const routes: Routes = [
    {
        path: '', component: ForgotPassComponent, children: [
            {path: '', redirectTo: '/projects', pathMatch: 'full'},
            {path: 'sendResetLink', component: SendLinkComponent, data: {title: 'Send reset link'}},
            {path: ':email/forgot-password/:token', component: ConfirmPassComponent, data: {title: 'Create new password'}}
        ]
    }
];

@NgModule({
    declarations: [
        ForgotPassComponent,
        SendLinkComponent,
        ConfirmPassComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ForgotPassModule {
}
