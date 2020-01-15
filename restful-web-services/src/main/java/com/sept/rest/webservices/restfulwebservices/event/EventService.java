package com.sept.rest.webservices.restfulwebservices.event;

import java.util.ArrayList;
import java.util.List;

// Event API Service Class
public class EventService {

	private static List<Event> events = new ArrayList<>();
	private static long idCounter = 0;

	public List<Event> findAll() {
		return events;
	}
	
	public Event save(Event event) {
		if(event.getId()==-1 || event.getId()==0) {
			event.setId(++idCounter);
			events.add(event);
		} else {
			deleteById(event.getId());
			events.add(event);
		}
		return event;
	}

	public Event deleteById(long id) {
		Event event = findById(id);

		if (event == null)
			return null;

		if (events.remove(event)) {
			return event;
		}

		return null;
	}

	public Event findById(long id) {
		for (Event event : events) {
			if (event.getId() == id) {
				return event;
			}
		}

		return null;
	}
	
}
