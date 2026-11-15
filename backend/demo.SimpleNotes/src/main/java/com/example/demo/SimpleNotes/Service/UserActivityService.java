package com.example.demo.SimpleNotes.Service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.SimpleNotes.Entity.UserActivity;
import com.example.demo.SimpleNotes.Repository.UserActivityRepository;



@Service
public class UserActivityService {
	private UserActivityRepository userActivityRepository;
	public UserActivityService(UserActivityRepository userActivityRepository)
	{
		this.userActivityRepository=userActivityRepository;
	}
	
	public List<UserActivity> getUserActivities(long userId)
	{
		return userActivityRepository.findByUserId(userId);
		
	}
	public void deleteActivity(long userId)
	{
		userActivityRepository.deleteAllByUserId(userId);
	}
}
