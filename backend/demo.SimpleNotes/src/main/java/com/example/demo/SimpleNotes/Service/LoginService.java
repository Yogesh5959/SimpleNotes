package com.example.demo.SimpleNotes.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import com.example.demo.SimpleNotes.Entity.Login;
import com.example.demo.SimpleNotes.Entity.Signup;
import com.example.demo.SimpleNotes.Repository.SignUpRepository;
@Service
public class LoginService {
	private SignUpRepository signUpRepository;
	private PasswordEncoder passwordEncoder;
	public LoginService(SignUpRepository signUpRepository,PasswordEncoder passwordEncoder)
	
	{
		this.signUpRepository=signUpRepository;
		this.passwordEncoder=passwordEncoder;
	}
	public Object login(Login login)
	{
		Signup userDetails=signUpRepository.findByUserName(login.getUserName());
		if(userDetails==null)
		{
			
			return "User with this email doesn't exists";
		}
		if(passwordEncoder.matches(login.getPassword(), userDetails.getPassword()))
		{
			return userDetails.getUserId();
		}
		return "Email or password is incorrect";
		
	}
}
