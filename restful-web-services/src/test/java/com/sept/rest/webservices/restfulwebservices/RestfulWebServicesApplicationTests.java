package com.sept.rest.webservices.restfulwebservices;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.sept.rest.webservices.restfulwebservices.event.Event;

import com.sept.rest.webservices.restfulwebservices.post.Post;
import com.sept.rest.webservices.restfulwebservices.timetable.Class;
import com.sept.rest.webservices.restfulwebservices.user.User;
import com.sept.rest.webservices.restfulwebservices.user.UserConstructor;
import com.sept.rest.webservices.restfulwebservices.user.UserController;


// Class for backend unit tests
@RunWith(SpringRunner.class)
@SpringBootTest
public class RestfulWebServicesApplicationTests 
{
	
	User user = new User();
	UserController rc = new UserController();
	UserConstructor userDTO = new UserConstructor();
	Class c = new Class((long) 1, "Ali", "SEPT Tutorial", "16:30", "18:30", "Thursday", "57.03.07");
	SimpleDateFormat sdf = new SimpleDateFormat("dd-M-yyyy hh:mm:ss");
	Date eventDate = new Date();
	Date eventEnd = new Date();	
	Event event = new Event ((long) 1, "Ali", "SEPT Party with Capricho Chicken", "Let's celebrate! Woohoo!", eventDate, eventEnd, "Building 57");
	
	@Test 
	public void checkUsernameSucess()
	{
		String username = "Hello";
		user.setUsername("Hello");

		assertEquals(user.getUsername(), username);
	}
	
	@Test
	public void validRegexEmailTests()
	{
		UserConstructor a = new UserConstructor();
		a.setEmail("helloWorld123@rmit.com");
		assertEquals(rc.isValid(a.getEmail()),true);
	}
	
	@Test
	public void invalidRegexEmailTests()
	{
		UserConstructor a = new UserConstructor();
		a.setEmail("invalid_email");
		assertEquals(rc.isValid(a.getEmail()),false);
	}
	
	@Test
	public void confirmPasswordSuccess()
	{
		userDTO.setPassword("password123");
		userDTO.setConfirmPassword("password123");
		
		String password = userDTO.getPassword();
		String confirm_password = userDTO.getConfirmPassword();
		
		assertEquals(rc.passwordMatch(password, confirm_password), true);
	}
	
	@Test
	public void confirmPasswordMismatch()
	{
		userDTO.setPassword("password123");
		userDTO.setConfirmPassword("helloworld");
		
		String password = userDTO.getPassword();
		String confirm_password = userDTO.getConfirmPassword();
		
		assertEquals(rc.passwordMatch(password, confirm_password), false);
	}	
	
	@Test
	public void correctPasswordTest()
	{	
		user.setPassword("World");
		
		assertTrue(user.getPassword() == "World");
	}

	@Test
	public void incorrectPasswordTest() 
	{
		user.setPassword("World");
		
		assertFalse(user.getPassword().compareTo("world") == 0);
	}

	@Test
	public void passwordChangeSuccess()
	{
		user.setPassword("Hello");
		
		assertTrue(user.getPassword().compareTo("Hello") == 0);
	}
	
	
	
	//Second batch of tests for new functionality
	
	
	//Tests that the post works well
	@Test
	public void postTest()
	{
		Post p1 = new Post();
		Post p2 = new Post();
		
		p1.setContent("Hi david");
		p2.setContent("What's up?");
		
		assertFalse(p1.getContent().compareTo(p2.getContent()) == 1);	
	}

	
	//Tests to see that the "edit profile" functionality works 
	@Test
	public void updateFirstName()
	{
	
		String firstName = "David";
		user.setFirstName(firstName);
		assertTrue(user.getFirstName().compareTo(firstName) == 0);
	}
	
	//Tests to see that the edit last name works
	@Test
	public void updateLastName()
	{
	
		String lastName = "Sept";
		user.setLastName(lastName);
		assertTrue(user.getLastName().compareTo(lastName) == 0);
		lastName = "dummy";
		user.setLastName(lastName);
		assertTrue(user.getLastName().compareTo(lastName)==0);
	}
	
	//Tests to see that updating the major works 
	@Test
	public void updateMajor()
	{
		String major = "Computer Science";
		user.setMajor(major);
		assertTrue(user.getMajor().compareTo(major) == 0);
		major = "Business";
		user.setMajor(major);
		assertTrue(user.getMajor().compareTo(major) == 0);
	}
	
	//Tests to see that updating the bio of the user works
	@Test
	public void updateAboutMe()
	{
		String aboutMe = "I love swimming!";
		user.setAboutMe(aboutMe);
		assertTrue(user.getAboutMe().compareTo(aboutMe) == 0);
		aboutMe = "Actually, I don't like swimming.";
		user.setAboutMe(aboutMe);
		assertTrue(user.getAboutMe().compareTo(aboutMe) == 0);
	}
	
	//Post functionality testing to see if the post shows the correct date posted
	@Test
	public void postDateTestCorrect()
	{
		Post p1 = new Post();
		Date d = new Date();
		p1.setDatePosted(d);
		assertTrue(p1.getDatePosted().compareTo(d) == 0);
	}
	
	//Post functionality testing to see if the post shows the correct user who posted the post
	@Test
	public void correctProfilePost()
	{
		Post post = new Post();
		User user = new User();
		user.setUsername("sept");
		post.setUsername("sept");

		assertEquals(user.getUsername(), post.getUsername());
		
	}
	
	//Test to see if updating Day of Class works
	@Test
	public void classDayTest()
	{
		assertTrue(c.getDay().compareTo("Thursday") == 0);
		c.setDay("Friday");
		assertTrue(c.getDay().compareTo("Friday") == 0);
		assertFalse(c.getDay().compareTo("Thursday") == 0);
	}
	
	//Test to see if updating Class Description works
	@Test
	public void classDescriptionTest()
	{
		assertTrue(c.getDescription().compareTo("SEPT Tutorial") == 0);
		c.setDescription("SEPT Lecture");
		assertTrue(c.getDescription().compareTo("SEPT Lecture") == 0);
		assertFalse(c.getDescription().compareTo("SEPT Tutorial") == 0);
	}
	
	//Test to see if updating Class Start Time works
	@Test
	public void classStartTimeTest()
	{
		assertTrue(c.getStartTime().compareTo("16:30") == 0);
		c.setStartTime("17:30");
		assertTrue(c.getStartTime().compareTo("17:30") == 0);
		assertFalse(c.getStartTime().compareTo("16:30") == 0);
	}
	
	//Test to see if updating Class End Time works
	@Test
	public void classEndTimeTest()
	{
		assertTrue(c.getEndTime().compareTo("18:30") == 0);
		c.setEndTime("19:30");
		assertTrue(c.getEndTime().compareTo("19:30") == 0);
		assertFalse(c.getEndTime().compareTo("18:30") == 0);
	}
	
	//Test to see if updating Class Location works
	@Test
	public void classLocationTest()
	{
		assertTrue(c.getLocation().compareTo("57.03.07") == 0);
		c.setLocation("16.01.01");
		assertTrue(c.getLocation().compareTo("16.01.01") == 0);
		assertFalse(c.getLocation().compareTo("57.03.07") == 0);
	}
	
	//Test to see if updating Event title works
	@Test
	public void eventTitleTest()
	{
		assertTrue(event.getTitle().compareTo("SEPT Party with Capricho Chicken") == 0);
		event.setTitle("SEPT Class");
		assertTrue(event.getTitle().compareTo("SEPT Class") == 0);
		assertFalse(event.getTitle().compareTo("SEPT Party with Capricho Chicken") == 0);
	}
	
	//Test to see if updating Event descriptions works
	@Test
	public void eventDescriptionsTest()
	{
		assertTrue(event.getDescriptions().compareTo("Let's celebrate! Woohoo!") == 0);
		event.setDescriptions("Bring your own sauce!");
		assertTrue(event.getDescriptions().compareTo("Bring your own sauce!") == 0);
		assertFalse(event.getDescriptions().compareTo("Let's celebrate! Woohoo!") == 0);
	}
	
	//Test to see if updating Event start date works
	@Test
	public void eventDateTest()
	{
		assertTrue(event.getEventDate().compareTo(eventDate) == 0);
		Date newDate = new Date();
		event.setEventDate(newDate);
		assertTrue(event.getEventDate().compareTo(newDate) == 0);
		assertFalse(event.getEventDate().compareTo(eventDate) == 0);
	}
	
	//Test to see if updating Event end date works
	@Test
	public void eventEndTest()
	{
		assertTrue(event.getEventEnd().compareTo(eventEnd) == 0);
		Date newDate = new Date();
		event.setEventEnd(newDate);
		assertTrue(event.getEventEnd().compareTo(newDate) == 0);
		assertFalse(event.getEventEnd().compareTo(eventEnd) == 0);
	}

	//Test to see if updating Event Building Name works
	@Test
	public void eventBuildingNameTest()
	{
		assertTrue(event.getBuildingName().compareTo("Building 57") == 0);
		event.setBuildingName("Building 10");
		assertTrue(event.getBuildingName().compareTo("Building 10") == 0);
		assertFalse(event.getBuildingName().compareTo("Building 57") == 0);
	}
	
}
