package com.example.demo.SimpleNotes.Entity;
import java.time.DateTimeException;
import java.time.LocalDateTime;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "userActivity")
public class UserActivity {
	@Id
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "user_id")
	private long userId;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "type",nullable = false)
	private ActivityType type;
	@Column(name = "activityTime",nullable = false)
	private LocalDateTime activityTime;
	@Column(name = "note_name")
	private String noteName;
	public long getId() {
		return id;
	
	}
	
	public String getNoteName() {
		return noteName;
	}

	public void setNoteName(String noteName) {
		this.noteName = noteName;
	}

	public void setId(long id) {
		this.id = id;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public ActivityType getType() {
		return type;
	}
	public void setType(ActivityType type) {
		this.type = type;
	}
	public LocalDateTime getActivityTime() {
		return activityTime;
	}
	public void setActivityTime(LocalDateTime activityTime) {
		this.activityTime = activityTime;
	}
	public UserActivity(long userId, String Notename, ActivityType type, LocalDateTime activityTime) {
		super();
		this.userId = userId;
		this.type = type;
		this.activityTime = activityTime;
		this.noteName=noteName;
	}
	
	public UserActivity()
	{
		
	
	}

}
