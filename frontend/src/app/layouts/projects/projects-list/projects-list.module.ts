import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsSearchComponent} from './projects-search/projects-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterPipe} from './pipes/filter.pipe';
import {ProjectEditDialogComponent} from './project-edit-dialog/project-edit-dialog.component';
import {ProjectLikeComponent} from './project-like/project-like.component';
import {ProjectCreateDialogComponent} from './project-create-dialog/project-create-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MaterialModule} from '../../../material-module';
import {ListComponent} from './list/list.component';
import {ProjectsListComponent} from './projects-list.component';
import { GitImportDialogComponent } from './git-import-dialog/git-import-dialog.component';
@NgModule({
    declarations: [
        ProjectsListComponent,
        ListComponent,
        ProjectsSearchComponent,
        FilterPipe,
        ProjectEditDialogComponent,
        ProjectLikeComponent,
        ProjectCreateDialogComponent,
        ConfirmDialogComponent,
        GitImportDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    entryComponents: [
        ProjectEditDialogComponent,
        ProjectCreateDialogComponent,
        ConfirmDialogComponent,
        GitImportDialogComponent
    ]
})
export class ProjectsListModule {
}
