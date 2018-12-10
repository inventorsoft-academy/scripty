import {Component, OnInit} from '@angular/core';
import {HighlightResult} from 'ngx-highlightjs';


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
    htmlCode: string;
    styleCode: string;
    scriptCode: string;

    public constructor() {
        this.html = '<div>asfaf</div>';
        this.script = '';
        this.style = '';
        this.run();

    }

    ngOnInit() {
    }

    onInputCode(e: any, type: string) {
        console.log(e, type, e.target.value);
        if (this.hasOwnProperty(type)) {
            console.log(e.target.selectionStart, e.target.selectionEnd);
            const cursor = '▏',
                value = e.target.value.replace(new RegExp(cursor, 'g'), '');
            let cursorPosition = 0;
            if (e.target.selectionStart === e.target.selectionEnd) {
                cursorPosition = e.target.selectionStart;
            }
            this[type] = value;
            // this[`${type}Code`] = `${value.substring(0, cursorPosition)}${cursor}${value.substring(cursorPosition)}`;
            this[`${type}Code`] = `${value.substring(0, cursorPosition)}${value.substring(cursorPosition)}`;
        }
    }
    onMouseDown(e: any, type: string) {
        console.log(e, type, e.target.value);
        if (this.hasOwnProperty(type)) {
            console.log(e.target.selectionStart, e.target.selectionEnd);
            const cursor = '▏',
                value = this.html.replace(new RegExp(cursor, 'g'), '');
            let cursorPosition = 0;
            if (e.target.selectionStart === e.target.selectionEnd) {
                cursorPosition = e.target.selectionStart;
            }
            this[type] = value;
            // this[`${type}Code`] = `${value.substring(0, cursorPosition)}${cursor}${value.substring(cursorPosition)}`;
            this[`${type}Code`] = `${value.substring(0, cursorPosition)}${value.substring(cursorPosition)}`;
        }
    }


    onBlurCode(type: string) {
        if (this.hasOwnProperty(`${type}Code`)) {
            this[`${type}Code`] = this[type];
        }
    }


    onHighlight(e: any) {
        console.log(e, this.htmlCode);
    }

    run() {
        this.htmlCode = this.html;
        this.styleCode = this.style;
        this.scriptCode = this.script;
        this.result = `data:text/html;charset = utf - 8,<html>
                <head>
                    <style>${this.style}</style>
                </head>
            <body>
            ${this.html}
            <script>${this.script}</script>
            </body>
            </html>`;
    }

}
