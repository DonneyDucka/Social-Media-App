package com.sept.rest.webservices.restfulwebservices.timetable;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ClassController {

	@Autowired
	private ClassJpaRepository cJpaRepository;

	@GetMapping("/jpa/users/{username}/classes")
	public List<Class> getAllClasss(@PathVariable String username){
		return cJpaRepository.findByUsername(username);
	}

	@GetMapping("/jpa/users/{username}/classes/{id}")
	public Class getClass(@PathVariable String username, @PathVariable long id){
		return cJpaRepository.findById(id).get();
		//return cService.findById(id);
	}

	// DELETE /users/{username}/classes/{id}
	@DeleteMapping("/jpa/users/{username}/classes/{id}")
	public ResponseEntity<Void> deleteClass(
			@PathVariable String username, @PathVariable long id) {

		cJpaRepository.deleteById(id);

		return ResponseEntity.noContent().build();
	}

	//Edit/Update a Class
	//PUT /users/{user_name}/classes/{c_id}
	@PutMapping("/jpa/users/{username}/classes/{id}")
	public ResponseEntity<Class> updateClass(
			@PathVariable String username,
			@PathVariable long id, @RequestBody Class c){

		c.setUsername(username);

		Class cUpdated = cJpaRepository.save(c);

		return new ResponseEntity<Class>(c, HttpStatus.OK);
	}

	@PostMapping("/jpa/users/{username}/classes")
	public ResponseEntity<Void> createClass(
			@PathVariable String username, @RequestBody Class c){

		c.setUsername(username);

		Class createdClass = cJpaRepository.save(c);

		//Location
		//Get current resource url
		///{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdClass.getId()).toUri();

		return ResponseEntity.created(uri).build();
	}


}