package com.example.demo.SimpleNotes.Controllers;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.SimpleNotes.Entity.Login;
import com.example.demo.SimpleNotes.Service.LoginService;

import jakarta.servlet.http.HttpSession;
@RestController

@RequestMapping("/api/Login")
public class LoginController {
	
	private LoginService loginService;
	public LoginController(LoginService loginService)
	{
		this.loginService=loginService;
	}
	@PostMapping
	public ResponseEntity<String> login(@RequestBody Login login,HttpSession session)
	{
		Object result=loginService.login(login);
		
		if(result instanceof String)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result.toString());
		}
		Long userId = (Long)result;
		session.setAttribute("userId", userId);
		session.setMaxInactiveInterval(24 * 60 * 60);
		
		return ResponseEntity.status(HttpStatus.OK).body("Login Successfull");
		
	}
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session)
	{
		
		session.invalidate();
		return ResponseEntity.status(HttpStatus.OK).body("Logged Out");
	}
}
