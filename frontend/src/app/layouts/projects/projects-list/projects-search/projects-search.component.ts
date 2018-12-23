import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ProjectCreateDialogComponent} from '../project-create-dialog/project-create-dialog.component';
import {GitImportDialogComponent} from '../git-import-dialog/git-import-dialog.component';

@Component({
    selector: 'app-projects-search',
    templateUrl: './projects-search.component.html',
    styleUrls: ['./projects-search.component.scss']
})
export class ProjectsSearchComponent implements OnInit {
    searchStr = '';
    @Output() search = new EventEmitter<string>();
    @Output() changeList = new EventEmitter();

    createDialogRef: MatDialogRef<ProjectCreateDialogComponent>;
    importDialogRef: MatDialogRef<GitImportDialogComponent>;

    onChange() {
        this.search.emit(this.searchStr);
    }

    constructor(private dialog: MatDialog) {
    }

    ngOnInit(): void {
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
}
