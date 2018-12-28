import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../../../models/Project';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    getProjects() {
        return this.httpClient.get('/api/projects');
    }

    createProject(project: Project) {
        const body = {
            'name': project.name,
            'description': project.description,
            'visibility': project.visibility
        };
        return this.httpClient.post('/api/projects', body);
    }

    updateProject(id: number, description: string, visibility: boolean) {
        const body = {
            'description': description,
            'visibility': visibility
        };

        return this.httpClient.put(`/api/projects/${id}`, body);
    }

    deleteProject(projectId: number) {
        return this.httpClient.delete('/api/url/' + projectId);
    }

    archiveProject(projectId: number) {
        return this.httpClient.put(`/api/projects/${projectId}?archive=true`, {});
    }

    importFromGitHub(url: string) {
        return this.httpClient.post('/api/projects/github', {
            githubURL: url
        });
    }

    constructor(private httpClient: HttpClient) {
    }
}
