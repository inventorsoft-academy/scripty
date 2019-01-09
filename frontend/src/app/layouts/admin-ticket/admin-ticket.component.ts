import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AdminTicketService} from './admin-ticket.service';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-admin-ticket',
    templateUrl: './admin-ticket.component.html',
    styleUrls: ['./admin-ticket.component.scss']
})
export class AdminTicketComponent {
    @ViewChild('fileName') fileName: ElementRef;

    imageSrc: string | ArrayBuffer;
    errorText = '';
    form: FormGroup;

    constructor(private _cd: ChangeDetectorRef,
                private _router: Router,
                private _adminTicketService: AdminTicketService) {
        this.form = new FormGroup({
            title: new FormControl(null, [Validators.required,
                Validators.maxLength(50)]),
            description: new FormControl(null, [Validators.required,
                Validators.maxLength(255)]),
            file: new FormControl(null)
        });
    }

    onFileChange(event) {
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            this.form.get('file').reset();
            this.imageSrc = '';
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            if (file.size > 5242880) {
                reader.abort();
                this.errorText = 'No file chosen';
            }

            if (file.type !== 'image/png' && file.type !== 'image/gif' && file.type !==  'image/jpeg') {
                reader.abort();
                this.errorText = 'Unsupported file format!';
            }

            if (reader.readyState === 1) {
                this.fileName.nativeElement.innerHTML = 'Loading...';
            }

            reader.onload = () => {
                this.form.patchValue({
                    file: reader.result
                });

                this.errorText = '';

                this.fileName.nativeElement.innerHTML = file.name;
                this.imageSrc = reader.result;

                this._cd.markForCheck();
            };
        }
    }

    onSubmit() {
        const formData = new FormData();

        formData.append('picture', this.form.get('file').value);
        formData.append('ticket', new Blob([JSON.stringify({
            'title': this.form.get('title').value,
            'description': this.form.get('description').value
        })], {
            type: 'application/json'
        }));

        this._adminTicketService.sendReport(formData)
            .subscribe(
                () => {
                    console.log('Message sent!\nThank you for making us better!');
                    this._router.navigateByUrl('/');
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
