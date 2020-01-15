package com.sept.rest.webservices.restfulwebservices.user;

// Class for constructing User Object
public class UserConstructor {
	private String username;
	private String password;
	private String email;
	private String confirmPassword;
	private String profilePicture;
	private String firstName;
	private String lastName;
	private String major;
	private String aboutMe;

	public String getUsername() {
		return username;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public String getFirstName(){
		return firstName;
	}

	public String getLastName(){
		return lastName;
	}

	public String getMajor(){
		return major;
	}

	public String getAboutMe(){
		return aboutMe;
	}

	public void setProfilePicture(String profilePicture){
		this.profilePicture = profilePicture;
	}

	public void setFirstName(String firstName){
		this.firstName = firstName;
	}

	public void setLastName(String lastName){
		this.lastName = lastName;
	}

	public void setMajor(String major){
		this.major = major;
	}

	public void setAboutMe(String aboutMe){
		this.aboutMe = aboutMe;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getConfirmPassword() {
		return confirmPassword;
	}
	
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
}
