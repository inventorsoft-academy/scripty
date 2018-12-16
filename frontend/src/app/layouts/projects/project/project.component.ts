import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";


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

    key = null;

    public constructor(private http: HttpClient) {
        this.html = localStorage.getItem('html') || '';
        this.script = localStorage.getItem('script') || '';
        this.style = localStorage.getItem('style') || '';
        this.run();
    }

    ngOnInit() {
        this.http.get('/api/test').subscribe(req => {
            this.key = req;
            console.log(this.key);
        });
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
