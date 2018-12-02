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

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';

function HLLanguages() {
    return [
        {name: 'typescript', func: typescript},
        {name: 'javascript', func: javascript},
        {name: 'scss', func: scss},
        {name: 'xml', func: xml}
    ];
}

@NgModule({
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        FormsModule,
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
