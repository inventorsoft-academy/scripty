import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Project} from '../../../../models/Project';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../projects.service';

@Component({
    selector: 'app-project-edit-dialog',
    templateUrl: './project-edit-dialog.component.html',
    styleUrls: ['./project-edit-dialog.component.scss']
})
export class ProjectEditDialogComponent {
    form: FormGroup;
    projectTypes = ['JavaScript', 'jQuery', 'Vue', 'GitHub'];
    project: Project;

    constructor(
        public dialogRef: MatDialogRef<ProjectEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) project: Project,
        private projectsService: ProjectsService) {
        this.project = project;
        this.form = new FormGroup({
            description: new FormControl(this.project.description.includes('github.com') ? 'GitHub' : this.project.description,
                [Validators.required]),
            visibility: new FormControl(this.project.visibility ? 'true' : 'false', [Validators.required])
        });
    }

    onNoClick() {
        this.dialogRef.close();
    }

    submit() {
        this.projectsService.updateProject(
            this.project.id,
            this.form.value.description,
            this.form.value.visibility).subscribe(
            (response) => {
                console.log(response['response']);
                this.dialogRef.close(true);
            },
            (error) => {
                console.log(error);
                this.dialogRef.close(false);
            }
        );
    }

}
