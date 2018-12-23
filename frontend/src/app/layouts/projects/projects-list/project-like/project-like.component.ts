import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-project-like',
    templateUrl: './project-like.component.html',
    styleUrls: ['./project-like.component.scss']
})
export class ProjectLikeComponent implements OnInit {
    @Input() isLiked;

    constructor() {
    }

    ngOnInit() {
    }

    likeIt() {
        this.isLiked = !this.isLiked;
    }
}
