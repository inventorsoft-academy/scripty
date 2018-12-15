import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {ProjectsService} from '../projects.service';

@Component({
    selector: 'app-git-import-dialog',
    templateUrl: './git-import-dialog.component.html',
    styleUrls: ['./git-import-dialog.component.scss']
})
export class GitImportDialogComponent implements OnInit {
    form: FormGroup;

    constructor(public dialogRef: MatDialogRef<GitImportDialogComponent>,
                private projectsService: ProjectsService) {
        this.form = new FormGroup({
            url: new FormControl(null, [Validators.required,
                Validators.pattern('(https:\\/\\/)?github.com\\/\\S+.git$')])
        });
    }

    ngOnInit() {
    }

    submit() {
        this.projectsService.importFromGitHub(this.form.get('url').value)
            .subscribe(
                (data) => {
                    console.log(data);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    onNoClick() {
        this.dialogRef.close();
    }
}
