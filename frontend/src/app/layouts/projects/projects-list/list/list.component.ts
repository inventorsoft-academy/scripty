import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../models/Project';
import {ProjectEditDialogComponent} from '../project-edit-dialog/project-edit-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Input() projects: Project[];
    @Input() searchStr: string;
    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
    displayedColumns: string[] = ['name', 'description', 'author', 'edit'];
    userName: string;

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {
        this.userName = localStorage.getItem('user');
        // this.userName = 'user@test.co';
    }

    openEditDialog(project) {
        this.dialog.open(ProjectEditDialogComponent, {
            data: project
        });
    }

    openArchiveDialog(name: string) {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {});
        this.confirmDialogRef.componentInstance.confirmMessage = `Do you want to archive '${name}'?`;
        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    // archive project
                }
                this.confirmDialogRef = null;
            });
    }

    openDeleteDialog(name: string) {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {});
        this.confirmDialogRef.componentInstance.confirmMessage = `Do you want to delete '${name}'?`;
        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    // delete project
                }
                this.confirmDialogRef = null;
            });
    }
}
