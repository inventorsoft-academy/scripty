import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../../../models/Project';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    myheaders = new HttpHeaders({
        'Authorization':
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiand0cmVzb3VyY2VpZCJdLCJ1c2VyX25hbWUiOiJ1c2VyQHRlc3QuY28iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ2Mjg3MDkwLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNDQ3NDc0NDMtNjgzMy00YzczLWJmODUtZGNhZjM2N2UwZjYyIiwiY2xpZW50X2lkIjoiand0Y2xpZW50aWQifQ.i0EQtfWdHfGhLWeGZ9KoTY_UZu2M9wCcs4mT7Y3Ykis'
    });
    getProjects() {
        return this.httpClient.get('/api/projects', {
            headers: this.myheaders
        });
    }

    createProject(project: Project) {
        const body = {
            'name': project.name,
            'description': project.description,
            'visibility': project.visibility
        };
        return this.httpClient.post('/api/projects', body, {
            headers: this.myheaders
        });
    }

    updateProject(id: number, description: string, visibility: boolean) {
        const body = {
            'description': description,
            'visibility': visibility
        };

        return this.httpClient.put(`/api/projects/${id}`, body, {
            headers: this.myheaders
        });
    }

    deleteProject(projectId: number) {
        return this.httpClient.delete('/api/url/' + projectId);
    }

    archiveProject(projectId: number, value: boolean) {
        return this.httpClient.put(`/api/projects/${projectId}?archive=${value}`, {}, {
            headers: this.myheaders
        });
    }

    importFromGitHub(url: string) {
        return this.httpClient.post('/api/projects/github', {
            githubURL: url
        }, {
            headers: this.myheaders
        });
    }

    constructor(private httpClient: HttpClient) {
    }
}
