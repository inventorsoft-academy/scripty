import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../projects.service';
import {Project} from '../models/Project';
import {Router} from '@angular/router';

@Component({
    selector: 'app-project-create-dialog',
    templateUrl: './project-create-dialog.component.html',
    styleUrls: ['./project-create-dialog.component.scss']
})
export class ProjectCreateDialogComponent implements OnInit {
    form: FormGroup;
    projectTypes = ['JavaScript', 'JQuery', 'Vue'];

    constructor(public dialogRef: MatDialogRef<ProjectCreateDialogComponent>,
                private projectService: ProjectsService,
                private router: Router) {
        this.form = new FormGroup({
            name: new FormControl('Project Name', [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50)]),
            type: new FormControl(this.projectTypes[0], [Validators.required]),
            visibility: new FormControl('true', [Validators.required])
        });
    }

    ngOnInit() {
    }

    onNoClick() {
        this.dialogRef.close();
    }

    submit() {
        this.projectService.createProject(this.form.value)
            .subscribe(
                (data: Project) => {
                    console.log(data);
                    // redirect to project page
                },
                error => {
                    console.log(error);
                    if (error.status === 401) {
                        this.router.navigate(['login']);
                    }
                    // show toast with error
                }
            );
        this.dialogRef.close();
    }
}
