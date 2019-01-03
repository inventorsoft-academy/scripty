import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminTicketComponent} from './admin-ticket.component';
import {MaterialModule} from '../../material-module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', component: AdminTicketComponent}
];

@NgModule({
    declarations: [
        AdminTicketComponent
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
export class AdminTicketModule {
}
