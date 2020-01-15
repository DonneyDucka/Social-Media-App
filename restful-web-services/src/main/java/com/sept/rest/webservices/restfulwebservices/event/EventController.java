package com.sept.rest.webservices.restfulwebservices.event;

import java.net.URI;
import java.util.List;

import javax.persistence.EntityManager;

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
public class EventController {

	@Autowired
	private EventJpaRepository eventJpaRepository;
	
	@Autowired
	private EntityManager em;
	
	@GetMapping("/jpa/events/{username}")
	public List<Event> getAllEventsByUsername(@PathVariable String username){
		return eventJpaRepository.findByUsername(username);
	}

	@GetMapping("/jpa/events/{username}/{id}")
	public Event getEventByUsername(@PathVariable String username, @PathVariable long id){
		return eventJpaRepository.findById(id).get();
	}

	// DELETE /users/{username}/events/{id}
	@DeleteMapping("/jpa/events/{username}/{id}")
	public ResponseEntity<Void> deleteEvent(
			@PathVariable String username, @PathVariable long id) {

		eventJpaRepository.deleteById(id);

		return ResponseEntity.noContent().build();
	}

	//Edit/Update a Event
	//PUT /users/{user_name}/events/{event_id}
	@PutMapping("/jpa/events/{username}/{id}")
	public ResponseEntity<Event> updateEvent(
			@PathVariable String username,
			@PathVariable long id, @RequestBody Event event){
		
		event.setUsername(username);
		event.setId(id);
		
		Event eventUpdated = eventJpaRepository.save(event);
		
		return new ResponseEntity<Event>(event, HttpStatus.OK);
	}
	
	@PostMapping("/jpa/events/{username}")
	public ResponseEntity<Void> createEvent(
			@PathVariable String username, @RequestBody Event event){
		
		event.setUsername(username);
		
		Event createdEvent = eventJpaRepository.save(event);
		
		//Location
		//Get current resource url
		///{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdEvent.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@GetMapping("/jpa/events")
	public List<Event> getAllEvents(){
		List <Event> events = (List<Event>) em
		.createQuery("select a from Event a", Event.class)
		.getResultList();
		return events;
	}
}
