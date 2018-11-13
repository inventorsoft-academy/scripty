import { Component, ViewChild, ElementRef, Input } from '@angular/core';

import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Input() parentData

  iframe = ""

  @ViewChild('htmlPanel') htmlPanel: ElementRef;
  @ViewChild('iframePanel') iframePanel: ElementRef;
  @ViewChild('cssPanel') cssPanel: ElementRef;
  @ViewChild('jsPanel') jsPanel: ElementRef;

  htmlPanelValue = ""; cssPanelValue = ""; jsPanelValue = ""

  getValueFromArea(panel, where) {
    fromEvent(panel.nativeElement, "keyup")
      .pipe(
        debounceTime(500)
      )
      .subscribe(ch => {
        if (where === "html") {
          this.htmlPanelValue = "<html>" + ch.target.value + "</html>"
        } else if (where === "style") {
          this.cssPanelValue = "<style>" + ch.target.value + "</style>"
        } else if (where === "script") {
          this.jsPanelValue = "<script>" + ch.target.value + "</script>"
        }

        let doc = this.iframePanel.nativeElement.contentDocument
        //  || this.iframePanel.nativeElement.contentWindow;

        doc.open();
        doc.write(this.htmlPanelValue);
        doc.write(this.cssPanelValue);
        doc.write(this.jsPanelValue);
        doc.close();
      })
  }

  ngOnChanges() {
    this.getValueFromArea(this.htmlPanel, "html")
    this.getValueFromArea(this.cssPanel, "style")
    this.getValueFromArea(this.jsPanel, "script")

    if (this.parentData === 1) {
      this.iframe = "iframe-show"
    }
  }
}
