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
        console.log(e, type);
        this[type] = e.target.innerText;
    }

    onHighlight(e: any) {
        console.log(e, this.htmlCode);
    }

    run() {
        this.htmlCode = this.html;
        this.scriptCode = this.style;
        this.scriptCode = this.script;
        this.result = `data:text/html;charset=utf-8,
<html>
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
