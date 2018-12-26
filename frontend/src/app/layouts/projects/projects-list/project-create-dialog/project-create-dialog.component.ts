import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../projects.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-project-create-dialog',
    templateUrl: './project-create-dialog.component.html',
    styleUrls: ['./project-create-dialog.component.scss']
})
export class ProjectCreateDialogComponent {
    form: FormGroup;
    projectTypes = ['JavaScript', 'jQuery', 'Vue'];

    constructor(public dialogRef: MatDialogRef<ProjectCreateDialogComponent>,
                private projectService: ProjectsService,
                private router: Router) {
        this.form = new FormGroup({
            name: new FormControl('Project Name', [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50)]),
            description: new FormControl(this.projectTypes[0], [Validators.required]),
            visibility: new FormControl('true', [Validators.required])
        });
    }

    onNoClick() {
        this.dialogRef.close(false);
    }

    submit() {
        this.projectService.createProject(this.form.value)
            .subscribe(
                (data) => {
                    console.log(data);
                    this.dialogRef.close(true);
                },
                error => {
                    console.log(error);
                    if (error.status === 401) {
                        this.router.navigate(['login']);
                    }
                    if (error.status === 409) {
                        console.log(`A project with name '${this.form.get('name').value}' already exists.`);
                    }
                    this.dialogRef.close(false);
                }
            );
    }
}
