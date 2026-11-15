package com.example.demo.SimpleNotes.DTO;


public class NoteDto {
	private String title;
	private String content;
	
	private Long userId;
	private long id;
	public NoteDto(long id,String title, String content, Long userId) {
		
		this.title = title;
		this.content = content;
	
		this.userId = userId;
		this.id=id;
	}
	public NoteDto()
	{
		
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
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
}
