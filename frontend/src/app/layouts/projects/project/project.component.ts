import {Component, OnInit} from '@angular/core';


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

    public constructor() {
        this.html = '';
        this.script = '';
        this.style = '';
        this.run();

    }

    ngOnInit() {
    }

    run() {
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
