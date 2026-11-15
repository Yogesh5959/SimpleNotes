package com.example.demo.SimpleNotes.Service;


import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.demo.SimpleNotes.DTO.NoteDto;
import com.example.demo.SimpleNotes.Entity.ActivityType;
import com.example.demo.SimpleNotes.Entity.NoteEntity;
import com.example.demo.SimpleNotes.Entity.UserActivity;
import com.example.demo.SimpleNotes.Repository.SimpleNoteRepository;
import com.example.demo.SimpleNotes.Repository.UserActivityRepository;

import jakarta.transaction.Transactional;

@Service
public class SimpleNoteService {
	private SimpleNoteRepository simpleNoteRepository;
	private UserActivityRepository userActivityRepository;
	
	public SimpleNoteService(SimpleNoteRepository simpleNoteRepository,UserActivityRepository userActivityRepository)
	{
		this.simpleNoteRepository=simpleNoteRepository;
		this.userActivityRepository=userActivityRepository;
	}
	@Transactional
	public int addNote(NoteEntity noteEntity)
	
	{
		UserActivity userActivity=new UserActivity();
		userActivity.setUserId(noteEntity.getUserId());
		userActivity.setType(ActivityType.CREATED);
		userActivity.setActivityTime(LocalDateTime.now());
		userActivity.setNoteName(noteEntity.getTitle());
		int id =simpleNoteRepository.addNote(noteEntity);
		userActivityRepository.save(userActivity);
		return id;
		
	}
	@Transactional
	public int updateNote(int id,NoteEntity noteEntity)
	{
		
		int res=simpleNoteRepository.updateNote(id, noteEntity);
		if(res>0)
		{

			UserActivity userActivity=new UserActivity();
			userActivity.setUserId(noteEntity.getUserId());
			userActivity.setNoteName(noteEntity.getTitle());
			userActivity.setType(ActivityType.UPDATED);
			userActivity.setActivityTime(LocalDateTime.now());
			userActivityRepository.save(userActivity);
		}
		return res;
	}
	
	@Transactional
	public int deleteStudent(int id,long userId)
	{
		
		
			NoteEntity noteEntity=getnote(id, userId);
			int res =simpleNoteRepository.deleteNote(id,userId);
			if(res>0)
			{

				UserActivity userActivity=new UserActivity();
				userActivity.setUserId(userId);
				userActivity.setType(ActivityType.DELETED);
				userActivity.setNoteName(noteEntity.getTitle());
				userActivity.setActivityTime(LocalDateTime.now());
				userActivityRepository.save(userActivity);
			}
		return res;
		
	}
	public java.util.List<NoteEntity> getnotes(long userId)
	
	{
		return simpleNoteRepository.getAllnotes(userId);
	}
	public NoteEntity getnote(int id,long userId)
	{
		return simpleNoteRepository.getNote(id,userId);
	}
	public NoteDto getNoteWithTitle(String title,long userId)
	{
		NoteEntity noteEntity=simpleNoteRepository.getNoteWithTitle(title, userId);
		
		NoteDto noteDto=new NoteDto();
		noteDto.setTitle(noteEntity.getTitle());
		noteDto.setContent(noteEntity.getContent());
		noteDto.setUserId(noteEntity.getUserId());
		noteDto.setId(noteEntity.getId());
		return noteDto;
	}
}
