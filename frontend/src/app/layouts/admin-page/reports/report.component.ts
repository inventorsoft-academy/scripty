import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  res = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('api/test/user').subscribe(req => {
      this.res = req;
      console.log(this.res);
    });
  }
}
