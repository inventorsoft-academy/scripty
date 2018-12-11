import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { GoogleChartComponent } from 'ng2-google-charts';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
// import {UpdateComponent} from './update/update.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

    userChartData = {
        chartType: 'LineChart',
        dataTable: [
            ['User', 'Registered Users'],
            ['28.07.2018', 11],
            ['01.08.2018', 9],
            ['02.08.2018', 10],
            ['02.08.2018', 5],
            ['05.08.2018', 7]
        ],
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
    ];
  constructor() { }

    drop($event: CdkDragDrop<String[]>) {
        const tmp = this.arrayOfCharts[$event.currentIndex];
        this.arrayOfCharts[$event.currentIndex] = this.arrayOfCharts[$event.previousIndex];
        this.arrayOfCharts[$event.previousIndex] = tmp;
        moveItemInArray(this.arrayOfCharts, $event.currentIndex, $event.previousIndex);
    }

  ngOnInit() {
  }

}
