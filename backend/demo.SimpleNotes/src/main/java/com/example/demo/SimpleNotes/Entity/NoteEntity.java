package com.example.demo.SimpleNotes.Entity;

import jakarta.persistence.Column;

public class NoteEntity {
	private int id;
	private String title;
	private String content;
	
	private Long userId;
	
	public NoteEntity(String title, String content, Long userId) {
		
		this.title = title;
		this.content = content;
		this.userId = userId;
	}
	public NoteEntity()
	{
		
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getTitle() {
		return title;
	
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

}
