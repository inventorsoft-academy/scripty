import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ProjectCreateDialogComponent} from '../project-create-dialog/project-create-dialog.component';
import {GitImportDialogComponent} from '../git-import-dialog/git-import-dialog.component';

@Component({
    selector: 'app-projects-search',
    templateUrl: './projects-search.component.html',
    styleUrls: ['./projects-search.component.scss']
})
export class ProjectsSearchComponent {
    @ViewChild('searchInput') searchInput: ElementRef;
    @Output() search = new EventEmitter<string>();
    @Output() filterOptionsChanged = new EventEmitter<object>();
    @Output() changeList = new EventEmitter();

    createDialogRef: MatDialogRef<ProjectCreateDialogComponent>;
    importDialogRef: MatDialogRef<GitImportDialogComponent>;
    selectedOptions: Array<any>;

    onChangeSearchStr(str: string) {
        this.search.emit(str);
    }

    constructor(private dialog: MatDialog) {
    }

    openCreateDialog() {
        this.createDialogRef = this.dialog.open(ProjectCreateDialogComponent, {});
        this.createDialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    this.changeList.emit();
                }
                this.createDialogRef = null;
            });
    }

    openImportDialog() {
        this.importDialogRef = this.dialog.open(GitImportDialogComponent, {});
        this.importDialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    this.changeList.emit();
                }
                this.importDialogRef = null;
            });
    }

    onChangeFilterOptions() {
        this.filterOptionsChanged.emit({
            'onlyMy': this.selectedOptions.includes('onlyMy'),
            'archived': this.selectedOptions.includes('archived')
        });
    }
}
