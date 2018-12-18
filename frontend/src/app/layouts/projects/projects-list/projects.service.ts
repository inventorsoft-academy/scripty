import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from './models/Project';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    getProjects() {
        return this.httpClient.get('/api/projects');
    }

    getMoreProjects() {
        return this.httpClient.get('http://www.mocky.io/v2/5c1776df2f00005200b086fa');
    }

    createProject(project: Project) {
        const body = {
            'name': project.name,
            'description': project.type,
            'visibility': project.visibility
        };

        return this.httpClient.post('/api/projects', body);
        // return this.httpClient.post('/api/projects', body);
    }

    deleteProject(projectId: number) {
        return this.httpClient.delete('url' + projectId);
    }

    archiveProject(projectId: number) {
        // return observable
    }

    importFromGitHub(url: string) {
        return this.httpClient.post('/api/projects/github', {
            githubURL: url
        });
    }

    constructor(private httpClient: HttpClient) {
    }
}
