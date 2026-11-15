package com.example.demo.SimpleNotes.Controllers;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.SimpleNotes.Entity.UserActivity;
import com.example.demo.SimpleNotes.Service.UserActivityService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/userActivity")
public class UserActivityController {
	private UserActivityService userActivityService;
	public UserActivityController(UserActivityService userActivityService)
	{
		this.userActivityService=userActivityService;
	}
	
	@GetMapping("/getActivity")
	public ResponseEntity<?> userActivity(HttpSession session)
	{
		Long id=(Long)session.getAttribute("userId");
		if(id==null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");
		}
		List<UserActivity> activities=userActivityService.getUserActivities(id);
		
		
		
		return ResponseEntity.status(HttpStatus.OK).body(activities); 
	}
	@DeleteMapping("/deleteActivity")
	public ResponseEntity<?> deleteActivity(HttpSession session)
	{
		Long id=(Long)session.getAttribute("userId");
		if(id==null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");
		}
		userActivityService.deleteActivity(id);
		return ResponseEntity.status(HttpStatus.OK).body("All Activities Deleted Successfully");
	}
}
