package com.example.demo.SimpleNotes.Controllers;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.SimpleNotes.Entity.Signup;
import com.example.demo.SimpleNotes.Service.SignupService;

import jakarta.validation.Valid;
@RestController

@RequestMapping("/api/signup")
public class SignupController {
	
	
	SignupService signupService;
	public SignupController(SignupService signupService) {
		this.signupService=signupService;
		
	}
	@PostMapping
	
	public ResponseEntity<String> signup( @Valid @RequestBody Signup signup)
	{
		String result=signupService.createUser(signup);
		if(result==null)
		{
			return ResponseEntity.status(HttpStatus.CONFLICT).body("User email already exists");
		
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
	
	}
	
}
