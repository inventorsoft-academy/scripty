import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {TitleService} from './title.service';
import { FormsModule } from '@angular/forms';
import {AuthService} from './services/auth.service';
import { HTTP_INTERCEPTORS  } from '@angular/common/http';
import { TokenInterceptorService} from './services/token-interceptor.service';
import {HighlightModule} from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import { AlertComponent } from './components/alert/alert.component';

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
        AppComponent,
        AlertComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HighlightModule.forRoot({
            languages: HLLanguages
        }),
        MaterialModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        TitleService,
        {
            provide: HTTP_INTERCEPTORS ,
            useClass: TokenInterceptorService,
            multi: true
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(titleService: TitleService) {
        titleService.init();
    }
}
