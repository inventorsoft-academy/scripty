import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RoleGuardService} from "./services/role-guard.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {AdminPageModule} from "./layouts/admin-page/admin-page.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		AdminPageModule,
		HttpClientModule,
    ],
	providers: [AuthGuardService, RoleGuardService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
