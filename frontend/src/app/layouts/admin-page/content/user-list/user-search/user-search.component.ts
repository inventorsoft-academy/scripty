import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
    @ViewChild('inputEmail') inputEmail: ElementRef;
    @Output() emailChanged = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
        fromEvent(this.inputEmail.nativeElement, 'input')
            .pipe(debounceTime(500))
            .subscribe(
                () => {
                    this.emailChanged.emit(this.inputEmail.nativeElement.value);
                }
            );
    }

}
