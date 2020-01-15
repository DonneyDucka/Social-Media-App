package com.sept.rest.webservices.restfulwebservices.event;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

// Event entity definition for database storage

@Entity
@Table(name = "event") // specifies which table this will be stored.
public class Event {

	@Id
	@GeneratedValue
	private long id;
	private String username;
	private String title;
	private String descriptions;
	private Date eventDate;
	private Date eventEnd;
	private String buildingName;
	
	public Event()
	{
		
	}
	
	public Event(long id, String username, String title, String descriptions, Date eventDate, Date eventEnd, String buildingName) {
		this.id = id;
		this.username = username;
		this.title = title;
		this.descriptions = descriptions;
		this.eventDate = eventDate;
		this.eventEnd = eventEnd;
		this.buildingName = buildingName;
	}


	public Date getEventEnd() {
		return eventEnd;
	}

	public void setEventEnd(Date eventEnd) {
		this.eventEnd = eventEnd;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescriptions() {
		return descriptions;
	}
	public void setDescriptions(String descriptions) {
		this.descriptions = descriptions;
	}
	public Date getEventDate() {
		return eventDate;
	}
	public void setEventDate(Date eventDate) {
		this.eventDate = eventDate;
	}
	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Event other = (Event) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
}
