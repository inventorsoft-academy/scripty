import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {

    users = [
        ['User', 'Registered Users'],
    ];

    key = null;

    userChartData = {
        chartType: 'LineChart',
        dataTable: this.users,
        options: {'title': 'Users'},
        chartArea: {left: 0, top: 0}
    };

    projectChartData = {
        chartType: 'LineChart',
        dataTable: [
            ['Project', 'Created Project'],
            ['28.07.2018', 3],
            ['01.08.2018', 5],
            ['02.08.2018', 2],
            ['02.08.2018', 19],
            ['05.08.2018', 24]
        ],
        options: {'title': 'Projects'},
        chartArea: {left: 0, top: 0}
    };

    otherChartData = {
        chartType: 'LineChart',
        dataTable: [
            ['Project', 'Created Project'],
            ['28.07.2018', 6],
            ['01.08.2018', 1],
            ['02.08.2018', 19],
            ['02.08.2018', 4],
            ['05.08.2018', 88],
            ['06.08.2018', 88],
            ['07.08.2018', 89],
        ],
        options: {'title': 'Projects', 'width': '100%'},
        chartArea: {left: 0, top: 0}
    };

    arrayOfCharts = [
        this.userChartData,
        this.projectChartData,
        // this.otherChartData
    ];

  constructor(private http: HttpClient) { }

    drop($event: CdkDragDrop<String[]>) {
        // const tmp = this.arrayOfCharts[$event.currentIndex];
        // this.arrayOfCharts[$event.currentIndex] = this.arrayOfCharts[$event.previousIndex];
        // this.arrayOfCharts[$event.previousIndex] = tmp;
        moveItemInArray(this.arrayOfCharts, $event.currentIndex, $event.previousIndex);
    }

  ngOnInit() {
      this.http.get('https://api.github.com/users').subscribe(req => {
          this.key = req;
          this.key.forEach(data => {
              this.users.push(['28.12.2018', data.id]);
              console.log(this.users);
          });
      });
  }
}
