import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectsComponent} from './projects.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ProjectComponent} from './project/project.component';
import {FormsModule} from '@angular/forms';
import {SafePipe} from './safe.pipe';
import {HighlightModule} from 'ngx-highlightjs';

import {HLLanguages} from '../../app.module';
import {ProjectsListModule} from './projects-list/projects-list.module';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        FormsModule,
        ProjectsListModule,
        DirectivesModule,
        HighlightModule.forRoot({
            languages: HLLanguages
        })
    ],
    declarations: [
        ProjectsComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        ProjectComponent,
        SafePipe
    ]
})
export class ProjectsModule {
}
