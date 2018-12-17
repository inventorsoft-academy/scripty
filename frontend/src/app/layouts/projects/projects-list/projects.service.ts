import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from './models/Project';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    getProjects() {
        return this.httpClient.get('http://www.mocky.io/v2/5c1776c82f00006900b086f9');
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
        /*const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ0NzgzMjY4LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOGE2ZTRmNTAtYjE3MC00YWZhLTg4ZDgtYjE1NjM3NzMzMWFiIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.XQxDQ6kbOxjsFWUSdLQbeKMPxWkqoiiaBYIS878bs50' });
        const options = { headers: headers };*/

        // return this.httpClient.post('/api/projects', body, options);
        return this.httpClient.post('/api/projects', body);
    }

    deleteProject(projectId: number) {
        return this.httpClient.delete('url' + projectId);
    }

    archiveProject(projectId: number) {
        // return this.httpClient.
    }

    importFromGitHub(url: string) {
        return this.httpClient.post('/api/url', {
            url: url
        });
    }

    constructor(private httpClient: HttpClient) {
    }
}
