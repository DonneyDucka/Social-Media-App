package com.sept.rest.webservices.restfulwebservices.jwt;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sept.rest.webservices.restfulwebservices.user.User;
import com.sept.rest.webservices.restfulwebservices.user.UserConstructor;
import com.sept.rest.webservices.restfulwebservices.user.UserJpaRepository;

// This class is to store the users that have registered to our application.

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {
	// For now it is an ArrayList, we need to somehow make this into a working database.
  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
  
  @Autowired
  private UserJpaRepository userDao;

  @Autowired
  private PasswordEncoder bcryptEncoder;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	  User user = userDao.findByUsername(username);
	  if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
  }
  
  public User save(UserConstructor user) {
		User newUser = new User();
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setEmail(user.getEmail());
		newUser.setAboutMe(user.getAboutMe());
		newUser.setMajor(user.getMajor());
		newUser.setProfilePicture(user.getProfilePicture());
		newUser.setRole("ROLE_USER_2");
		return userDao.save(newUser);
	}
}
