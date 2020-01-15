package com.sept.rest.webservices.restfulwebservices.user;

import org.springframework.data.repository.CrudRepository;

import com.sept.rest.webservices.restfulwebservices.user.User;

// User API Repository
public interface UserJpaRepository extends CrudRepository<User, Integer>{
	User findByUsername(String username);
}
