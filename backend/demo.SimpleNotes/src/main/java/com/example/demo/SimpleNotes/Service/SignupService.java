package com.example.demo.SimpleNotes.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.SimpleNotes.Entity.Signup;
import com.example.demo.SimpleNotes.Repository.SignUpRepository;

@Service
public class SignupService {
	private SignUpRepository signUpRepository;
	PasswordEncoder passwordEncoder;
	public SignupService(SignUpRepository signUpRepository,PasswordEncoder passwordEncoder)
	
	{
		this.signUpRepository=signUpRepository;
		this.passwordEncoder=passwordEncoder;
	}
	
	
	public String createUser(Signup signup)
	{
		Signup newUser = new Signup();
		
		newUser.setUserId(signup.getUserId());
		newUser.setUserName(signup.getUserName());
		newUser.setPassword(passwordEncoder.encode(signup.getPassword()));
		
		boolean existsSignup = signUpRepository.existsByUserName(signup.getUserName());
		if(!existsSignup)
		{
			signUpRepository.save(newUser);
			return "Successfully Registered";
		
		}
		return null;
	}
	
}
