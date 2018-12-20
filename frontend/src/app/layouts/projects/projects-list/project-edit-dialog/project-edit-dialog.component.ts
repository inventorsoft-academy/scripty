import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Project} from '../models/Project';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../projects.service';

@Component({
    selector: 'app-project-edit-dialog',
    templateUrl: './project-edit-dialog.component.html',
    styleUrls: ['./project-edit-dialog.component.scss']
})
export class ProjectEditDialogComponent {
    form: FormGroup;
    projectTypes = ['JavaScript', 'JQuery', 'Vue'];

    constructor(
        public dialogRef: MatDialogRef<ProjectEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private project: Project,
        private projectsService: ProjectsService) {
        this.form = new FormGroup({
            type: new FormControl(this.project.type, [Validators.required]),
            visibility: new FormControl(this.project.visibility ? 'true' : 'false', [Validators.required])
        });
    }

    onNoClick() {
        this.dialogRef.close();
    }

    submit() {
        this.project.name = this.form.value.name;
        this.project.type = this.form.value.type;
        this.project.visibility = this.form.value.visibility;
        this.projectsService.updateProject(
            this.project.id,
            this.form.value.type,
            this.form.value.visibility).subscribe(
            (response) => {
                console.log(`\'${this.project.name}\' project updated.`);
            },
            (error) => {
                // show error
            }
        );
        this.dialogRef.close();
    }

}
