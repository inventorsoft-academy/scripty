import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Project} from '../../../../models/Project';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../projects.service';
import {ToastService} from '../../../../services/toast.service';

@Component({
    selector: 'app-project-edit-dialog',
    templateUrl: './project-edit-dialog.component.html',
    styleUrls: ['./project-edit-dialog.component.scss']
})
export class ProjectEditDialogComponent {
    form: FormGroup;
    projectTypes = ['JavaScript', 'jQuery', 'Vue', 'GitHub'];

    constructor(
        public dialogRef: MatDialogRef<ProjectEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private project: Project,
        private projectsService: ProjectsService,
        private toastService: ToastService) {
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
                this.toastService.showSuccess(response['response']);
                this.dialogRef.close(true);
            },
            (error) => {
                console.log(error);
                this.toastService.showError(error);
                this.dialogRef.close(false);
            }
        );
    }

}
