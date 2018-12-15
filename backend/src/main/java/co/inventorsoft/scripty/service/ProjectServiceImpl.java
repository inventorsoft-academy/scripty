package co.inventorsoft.scripty.service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectServiceInterface {

	@Autowired
	ProjectRepository projectRepository;	
	
	@Override
	public List<Project> getProjects() {		 
		return (List<Project>) projectRepository.findAll();
	}

	@Override
	@Transactional
	public List<Project> getProjectsByUser(Long id) {		 
		return projectRepository.findByUserId(id);
	}

}
