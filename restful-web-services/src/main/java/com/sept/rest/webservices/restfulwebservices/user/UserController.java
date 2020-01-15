package com.sept.rest.webservices.restfulwebservices.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import javax.persistence.EntityManager;

import com.sept.rest.webservices.restfulwebservices.jwt.JwtInMemoryUserDetailsService;

// User API Controller
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
	
	@Autowired
	private JwtInMemoryUserDetailsService userDetailsService;

	@Autowired
	private UserJpaRepository userDao;

	@Autowired
	private EntityManager em;
	
	// Check if user already exists in database!!!!!!! (return a message)
	// also perform validations in frontend!!!!
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody UserConstructor user) throws Exception{
		if (isValid(user.getEmail()) && passwordMatch(user.getPassword(), user.getConfirmPassword())) {
			return ResponseEntity.ok(userDetailsService.save(user));
		}
		else {
			return (ResponseEntity<?>) ResponseEntity.badRequest();
		}
	}
	
	public boolean isValid(String email) {
		String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
	    return email.matches(regex);
	}
	
	public boolean passwordMatch(String password, String confirm) {
		if(password.compareTo(confirm) == 0) return true;
		else return false;
	}

	@GetMapping("/jpa/users/{username}/profile")
	public User getProfile(@PathVariable String username) {
		return userDao.findByUsername(username);
	}

	@PutMapping("/jpa/users/{username}/updateProfile")
	public ResponseEntity<Void> updateProfile(
			@PathVariable String username,
			@RequestBody UserConstructor user) {
	
			User userUpdated = userDao.findByUsername(username);
			userUpdated.setAboutMe(user.getAboutMe());
			userUpdated.setFirstName(user.getFirstName());
			userUpdated.setLastName(user.getLastName());
			userUpdated.setMajor(user.getMajor());
			userUpdated.setProfilePicture(user.getProfilePicture());

			userDao.save(userUpdated);

		return ResponseEntity.noContent().build(); 
	}

	@GetMapping("/jpa/users/profiles")
	public List<User> getAllProfiles(){
		List <User> users = (List<User>) em
		.createQuery("select a from User a", User.class)
		.getResultList();
		return users;
	}

}
