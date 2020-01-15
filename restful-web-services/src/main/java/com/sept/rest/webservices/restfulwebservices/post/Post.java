package com.sept.rest.webservices.restfulwebservices.post;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

// Post entity definition for database storage
@Entity
public class Post {
	
	@Id
	@GeneratedValue
	private long id;
	private String username;
	private String posterUsername;
	private String content;
	private Date datePosted;
	
	public Post() {

	}
	
	public Post(long id, String username, String content, Date datePosted)
	{
		this.id = id;
		this.username = username;
		this.content = content;
		this.datePosted = datePosted;
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getDatePosted() {
		return datePosted;
	}

	public void setDatePosted(Date datePosted) {
		this.datePosted = datePosted;
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
		Post other = (Post) obj;
		if (id != other.id)
			return false;
		return true;
	}

	public String getPosterUsername() {
		return posterUsername;
	}

	public void setPosterUsername(String posterUsername) {
		this.posterUsername = posterUsername;
	}
}
