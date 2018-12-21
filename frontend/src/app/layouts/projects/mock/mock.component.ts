import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-mock',
    templateUrl: './mock.component.html',
    styleUrls: ['./mock.component.scss']
})
export class MockComponent implements OnInit {
    mockForm: FormGroup;


    constructor( private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.mockForm = this.formBuilder.group({
            statusCode: ['', Validators.required],
        });
    }

}
