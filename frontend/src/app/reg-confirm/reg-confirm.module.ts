import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegConfirmComponent} from './reg-confirm.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
    {path: '', component: RegConfirmComponent}
];

@NgModule({
    declarations: [
        RegConfirmComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RegConfirmModule {
}
