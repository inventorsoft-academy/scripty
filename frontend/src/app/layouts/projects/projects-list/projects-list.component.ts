import {Component, OnInit} from '@angular/core';
import {ProjectsService} from './projects.service';
import {Project} from '../../../models/Project';

@Component({
    selector: 'app-project',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
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

    updateList() {
        this.projectsService.getProjects()
            .subscribe((projects: Array<Project>) => {
                this.activeProjects = projects.sort((a, b) => {
                    if (b.archive) {
                        return -1;
                    }

                    return 0;
                });
            });
    }
}
