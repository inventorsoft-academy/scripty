import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {RoleGuardService} from './services/role-guard.service';
import {AuthGuardService} from './services/auth-guard.service';
import {AdminPageModule} from './layouts/admin-page/admin-page.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TitleService} from './title.service';
import {HighlightModule} from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthInterceptor} from './services/auth.interceptor';
import {AuthService} from './services/auth.service';
import {ToastService} from './toast.service';


export function HLLanguages() {
    return [
        {name: 'typescript', func: typescript},
        {name: 'javascript', func: javascript},
        {name: 'scss', func: scss},
        {name: 'xml', func: xml}
    ];
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        AdminPageModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule.forRoot({
            languages: HLLanguages
        }),
        HttpClientModule
    ],
    providers: [
        TitleService,
        ToastService,
        AuthGuardService,
        RoleGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(titleService: TitleService) {
        titleService.init();
    }
}
