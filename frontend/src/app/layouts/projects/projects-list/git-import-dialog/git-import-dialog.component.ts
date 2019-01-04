import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {ProjectsService} from '../projects.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-git-import-dialog',
    templateUrl: './git-import-dialog.component.html',
    styleUrls: ['./git-import-dialog.component.scss']
})
export class GitImportDialogComponent {
    form: FormGroup;

    constructor(public dialogRef: MatDialogRef<GitImportDialogComponent>,
                private projectsService: ProjectsService,
                private router: Router) {
        this.form = new FormGroup({
            url: new FormControl(null, [Validators.required,
                Validators.pattern('^https:\\/\\/github.com\\/.+?\\/(.+?).git$')])
        });
    }

    submit() {
        this.projectsService.importFromGitHub(this.form.get('url').value)
            .subscribe(
                (data) => {
                    console.log(data);
                    this.dialogRef.close(true);
                },
                (error) => {
                    console.log(error);
                    if (error.status === 401) {
                        this.router.navigate(['login']);
                    }
                    if (error.status === 409) {
                        console.log(`A project from url '${this.form.get('url').value}' already exists.`);
                    }
                    this.dialogRef.close(false);
                }
            );
    }

    onNoClick() {
        this.dialogRef.close();
    }
}
