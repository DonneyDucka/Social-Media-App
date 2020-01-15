package com.sept.rest.webservices.restfulwebservices.event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Event API Repository
@Repository
public interface EventJpaRepository extends JpaRepository<Event, Long> {
	List<Event> findByUsername(String username);
}
