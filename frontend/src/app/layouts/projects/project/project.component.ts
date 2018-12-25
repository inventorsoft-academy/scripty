import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
    result: string;
    html: string;
    style: string;
    script: string;
    @ViewChild('htmlCode') htmlCode: ElementRef;
    @ViewChild('styleCode') styleCode: ElementRef;
    @ViewChild('scriptCode') scriptCode: ElementRef;
    private readonly frameType: string;

    public constructor() {
        this.frameType = 'data:text/html;charset = utf - 8,';
        this.html = localStorage.getItem('html') || '';
        this.script = localStorage.getItem('script') || '';
        this.style = localStorage.getItem('style') || '';
        this.run();
    }

    ngOnInit() {
    }

    onScrollTextArea(event, type) {
        const element = `${type}Code`;
        this[element].nativeElement.scrollLeft = event.target.scrollLeft;
        this[element].nativeElement.scrollTop = event.target.scrollTop;
    }


    onBlurCode(type: string) {
        localStorage.setItem(type, this[type]);
    }

    onInputCode(e: any, type: string) {
        if (this.hasOwnProperty(type)) {
            this[type] = e.target.value;
        }
    }

    run() {
        this.result = `${this.frameType}`;
        setTimeout(() => {
            this.result = `${this.frameType}<html>
                <head>
                    <style>${this.style}</style>
                </head>
            <body>
            ${this.html}
            <script>${this.script}</script>
            </body>
            </html>`;
        }, 0);

    }
}
