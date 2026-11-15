package com.example.demo.SimpleNotes.Entity;


import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;


@Entity
@Table(name="user_Details")
public class Signup {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private long userId;
	@NotBlank
	@Email
	private String userName;
	@NotBlank(message = "Password is required")
	@Pattern(
	    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$",
	    message = "Password must contain at least 8 characters, one uppercase, one lowercase, one digit and one special character"
	)
	private String password;
	public long getUserId() {
		return userId;
	
	}
	public void setUserId(long userId)
	{
		this.userId=userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Signup( String userName, String password) {
		
		this.userName = userName;
		this.password = password;
	}
	
	public Signup() {
		
	}
	
	
}
