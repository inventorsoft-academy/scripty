import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-mock',
    templateUrl: './mock.component.html',
    styleUrls: ['./mock.component.scss']
})
export class MockComponent implements OnInit {
    mockForm: FormGroup;
    test: number[];


    constructor(private formBuilder: FormBuilder) {
        this.test = [1, 2, 3, 4];
    }

    ngOnInit() {
        this.mockForm = this.formBuilder.group({
            statusCode: ['', Validators.required],
            contentType: ['', Validators.required],
            charset: ['', Validators.required],
            body: ['', Validators.required]
        });
    }

}
