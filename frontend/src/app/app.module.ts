import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {TitleService} from './title.service';
import { FormsModule } from '@angular/forms';
import { EventsComponent } from './components/events/events.component';
import { SpecialEventsComponent } from './components/special-events/special-events.component';
import {AuthService} from './services/auth.service';
import { HTTP_INTERCEPTORS  } from '@angular/common/http';
import { TokenInterceptorService} from './services/token-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        EventsComponent,
        SpecialEventsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
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
