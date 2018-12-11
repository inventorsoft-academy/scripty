import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Component} from "@angular/core";

import {AdminRoutingModule} from './admin-routing.module';
import {AdminPageComponent} from './admin-page.component';
import {AdminHeaderComponent} from './header/header.component';
import {AdminSidebarComponent} from './sidebar/sidebar.component';
import {AdminContentComponent} from './content/content.component';
import {AdminFooterComponent} from './footer/footer.component';
import { ReportComponent } from './reports/report.component';
import {Ng2GoogleChartsModule} from "ng2-google-charts";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
	declarations: [
		AdminPageComponent,
		AdminHeaderComponent,
		AdminSidebarComponent,
		AdminContentComponent,
		AdminFooterComponent,
		ReportComponent,
	],
	imports: [
		CommonModule,
        Ng2GoogleChartsModule,
        DragDropModule,
		AdminRoutingModule,
	]
})
export class AdminPageModule {
}
