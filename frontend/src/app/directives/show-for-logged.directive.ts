import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector: '[appShowForLogged]'
})
export class ShowForLoggedDirective implements OnInit {

    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        if (localStorage.getItem('user') === null) {
            this.el.nativeElement.style.display = 'none';
        }
    }
}
