import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminPageComponent} from './admin-page.component';
import {AdminHeaderComponent} from './header/header.component';
import {AdminSidebarComponent} from './sidebar/sidebar.component';
import {AdminContentComponent} from './content/content.component';
import {AdminFooterComponent} from './footer/footer.component';
import {UserListComponent} from './content/user-list/user-list.component';
import {MaterialModule} from '../../material-module';

@NgModule({
    declarations: [
        AdminPageComponent,
        AdminHeaderComponent,
        AdminSidebarComponent,
        AdminContentComponent,
        AdminFooterComponent,
        UserListComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule
    ]
})
export class AdminPageModule {
}
