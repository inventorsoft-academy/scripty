package co.inventorsoft.scripty.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.ProjectDto;
import co.inventorsoft.scripty.model.dto.ProjectUpdateDto;
import co.inventorsoft.scripty.repository.ProjectRepository;
import co.inventorsoft.scripty.security.JWTSecurity;
import co.inventorsoft.scripty.service.ProjectService;
import co.inventorsoft.scripty.service.UserService;

/**
 * @author lzabidovsky 
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class ProjectControllerTest {
	
	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext wac;
	
	@Autowired
	private FilterChainProxy springSecurityFilterChain;

	@Autowired
	private JWTSecurity jwtSecurity;
	
	@Autowired
	ProjectService projectService;
	@Autowired
	ProjectRepository projectRepository;
	@Autowired
	UserService userService;

	private String accessToken;
    private String refreshToken;
    private String accessTokenAdmin;
    
    private static boolean setUpIsDone = false;
    private static long projectId;
    
	@Before
	public void setUp() throws Exception {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).addFilter(springSecurityFilterChain).build();
		refreshToken = jwtSecurity.obtainTokensGrantTypePassword("user@test.co", "jwtpass", mockMvc)[1];
		accessToken = jwtSecurity.obtainTokensGrantTypeRefreshToken(refreshToken, mockMvc)[0];
		accessTokenAdmin = jwtSecurity.obtainTokensGrantTypePassword("admin@test.co", "jwtpass", mockMvc)[0];
		
		if(!setUpIsDone) {
			createNewTestProject();
			setUpIsDone = true;
		}
	}

	public void createNewTestProject() throws Exception {
		try {
			projectId = projectService.saveProject(new ProjectDto("project0","Test Project",false), "user@test.co");
		} catch(ApplicationException e) {
			projectId = projectRepository.findByNameAndUser("project0", userService.findByEmail("user@test.co")).get().getId();
		}
	}

	@Test
	public void createShouldNotCreateNewProjectWhenProjectExist() throws Exception {
		String jsonString = new ObjectMapper().writeValueAsString(new ProjectDto("project0","Test Project",false));
		mockMvc.perform(post("/projects")
				.header("Authorization", "Bearer  " + accessToken)
				.contentType(JWTSecurity.CONTENT_TYPE)
				.content(jsonString))
				.andExpect(status().isConflict())
				.andExpect(content().contentType(JWTSecurity.CONTENT_TYPE))
				.andExpect(content().string(Matchers.containsString("Project with name project0 already exist")));
	}

	@Test
	public void createShouldNotCreateNewProjectWhenRoleIsNotUser() throws Exception {
		String jsonString = new ObjectMapper().writeValueAsString(new ProjectDto("project1","Test Project",false));
		mockMvc.perform(post("/projects")
				.header("Authorization", "Bearer  " + accessTokenAdmin)
				.contentType(JWTSecurity.CONTENT_TYPE)
				.content(jsonString))
				.andExpect(status().isForbidden());
	}

	@Test
	public void updateShouldUpdateProject() throws Exception {
		String jsonString = new ObjectMapper().writeValueAsString(new ProjectUpdateDto("Test Project Updated",false));
		mockMvc.perform(put("/projects/"+projectId)
				.header("Authorization", "Bearer  " + accessToken)
				.contentType(JWTSecurity.CONTENT_TYPE)
				.content(jsonString))
				.andExpect(status().isOk())
				.andExpect(content().contentType(JWTSecurity.CONTENT_TYPE))
				.andExpect(content().string(Matchers.containsString("was updated")));
	}

	@Test
	public void updateShouldNotUpdateProjectWhenUserIsNotOwner() throws Exception {
		String jsonString = new ObjectMapper().writeValueAsString(new ProjectUpdateDto("Test Project Updated",false));
		mockMvc.perform(put("/projects/"+projectId)
				.header("Authorization", "Bearer  " + accessTokenAdmin)
				.contentType(JWTSecurity.CONTENT_TYPE)
				.content(jsonString))
				.andExpect(status().isForbidden())
				.andExpect(content().contentType(JWTSecurity.CONTENT_TYPE))
				.andExpect(content().string(Matchers.containsString("has no access to project")));
	}

	@Test
	public void updateShouldNotUpdateProjectWhenProjectDoesNotExist() throws Exception {
		String jsonString = new ObjectMapper().writeValueAsString(new ProjectUpdateDto("Test Project Updated",false));
		mockMvc.perform(put("/projects/999")
				.header("Authorization", "Bearer  " + accessToken)
				.contentType(JWTSecurity.CONTENT_TYPE)
				.content(jsonString))
				.andExpect(status().isNotFound())
				.andExpect(content().contentType(JWTSecurity.CONTENT_TYPE))
				.andExpect(content().string(Matchers.containsString("does not exist")));
	}

}
