package co.inventorsoft.scripty.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserService userService;
	
	@RequestMapping("/users")
	List<User> getUsers() {
		
		return userService.getAllUsers();
	}
}
