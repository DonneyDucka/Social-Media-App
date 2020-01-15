package com.sept.rest.webservices.restfulwebservices.timetable;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Class API Repository
@Repository
public interface ClassJpaRepository extends JpaRepository<Class, Long>{
	List<Class> findByUsername(String username);
}