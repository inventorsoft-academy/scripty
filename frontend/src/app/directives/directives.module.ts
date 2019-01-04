import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowForLoggedDirective} from './show-for-logged.directive';

@NgModule({
    declarations: [
        ShowForLoggedDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ShowForLoggedDirective
    ]
})
export class DirectivesModule {
}
