package co.inventorsoft.scripty.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.repository.UserRepository;
import co.inventorsoft.scripty.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserService userService; 
	 
	@RequestMapping("/users")
	Page<User> getUsers(@RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size, @RequestParam Optional<String> sort ){
		return userService.getAllUsers(PageRequest.of(page.orElse(0), size.orElse(3), Sort.by(sort.orElse("id"))));
	}
	
	@RequestMapping("/users/search")
	Page<User> getUsersByEmail(@RequestParam String email, @RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size, @RequestParam Optional<String> sort ){
		return userService.findByEmailStartsWith(email, PageRequest.of(page.orElse(0), size.orElse(3), Sort.by(sort.orElse("createDate"))));
	}
	 
}
