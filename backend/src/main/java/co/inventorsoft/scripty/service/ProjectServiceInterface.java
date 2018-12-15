package co.inventorsoft.scripty.service;

import java.util.List;
import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;

public interface ProjectServiceInterface {

	public List<Project> getProjects();
	
	public List<Project> getProjectsByUser(Long id);
	
	 
}
