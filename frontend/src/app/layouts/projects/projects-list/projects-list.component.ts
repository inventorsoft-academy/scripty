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
    filterOptions: object;

    constructor(private projectsService: ProjectsService) {
    }

    ngOnInit() {
        this.filterOptions = {
            onlyMy: false,
            archived: false
        };
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

                    if (!a.archive && b.user.email !== localStorage.getItem('user')) {
                        return -1;
                    }

                    return 0;
                });
            });
    }

    onFilterOptionsChange(e: object) {
        this.filterOptions = e;
    }
}
