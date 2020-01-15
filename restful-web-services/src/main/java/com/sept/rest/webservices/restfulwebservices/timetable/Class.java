package com.sept.rest.webservices.restfulwebservices.timetable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

// Class entity definition for database storage
@Entity
@Table(name = "class") // specifies which table this will be stored.
public class Class {
	@Id
	@GeneratedValue
	private Long id;
	private String username;
	private String description;
	private String startTime;
	private String endTime;
	private String day;
	private String location;
	
	public Class() {
		
	}

	public Class(Long id, String username, String description, String startTime, String endTime, String day,
			String location) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.startTime = startTime;
		this.endTime = endTime;
		this.day = day;
		this.setLocation(location);
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
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
		Class other = (Class) obj;
		if (id != other.id)
			return false;
		return true;
	}




	public String getLocation() {
		return location;
	}




	public void setLocation(String location) {
		this.location = location;
	}

	
}