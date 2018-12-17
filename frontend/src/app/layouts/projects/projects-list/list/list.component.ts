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
    @Input() onlyMyProjects: boolean;
    @Input() likedProjects: Array<number>;
    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
    // displayedColumns: string[] = ['name', 'type', 'author', 'like', 'edit'];
    displayedColumns: string[] = ['name', 'like', 'edit'];
    userId: number;

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {
        this.userId = +localStorage.getItem('userId');
    }

    openEditDialog(project) {
        this.dialog.open(ProjectEditDialogComponent, {
            data: project
        });
    }

    openArchiveDialog() {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {});
        this.confirmDialogRef.componentInstance.confirmMessage = 'Do you want to archive this project?';
        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    // archive project
                }
                this.confirmDialogRef = null;
            });
    }

    openDeleteDialog() {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {});
        this.confirmDialogRef.componentInstance.confirmMessage = 'Do you want to delete this project?';
        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    // delete project
                }
                this.confirmDialogRef = null;
            });
    }
}
