import {Component, OnInit} from '@angular/core';
import {ProjectsService} from './projects.service';
import {Project} from './models/Project';
import {Router} from '@angular/router';

@Component({
    selector: 'app-project',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
    // projects: Array<Project>;
    activeProjects: Array<Project>;
    searchStr = '';

    constructor(private projectsService: ProjectsService) {
    }

    ngOnInit() {
        this.updateList();
    }

    onSearch(e: string) {
        this.searchStr = e;
    }

    showMore() {
        this.projectsService.getMoreProjects()
            .subscribe((projects: Array<Project>) => {
                /*this.projects = this.projects.concat(projects);
                this.activeProjects = this.projects;*/
            });
    }

    updateList() {
        this.projectsService.getProjects()
            .subscribe((projects: Array<Project>) => {
                this.activeProjects = projects;
            });
    }
}
