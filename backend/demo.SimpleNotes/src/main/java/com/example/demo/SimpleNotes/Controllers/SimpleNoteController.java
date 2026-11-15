package com.example.demo.SimpleNotes.Controllers;
import java.util.List;

import org.springframework.http.HttpStatus;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.SimpleNotes.DTO.NoteDto;
import com.example.demo.SimpleNotes.Entity.NoteEntity;
import com.example.demo.SimpleNotes.Service.SimpleNoteService;


import jakarta.servlet.http.HttpSession;
@RestController

@RequestMapping("api/note")
public class SimpleNoteController {
	private SimpleNoteService simpleNoteService;
	public SimpleNoteController(SimpleNoteService simpleNoteService)
	{
		
		this.simpleNoteService=simpleNoteService;
	}
	@PostMapping
	public ResponseEntity<?> createNote(@RequestBody NoteEntity noteEntity,HttpSession session)
	{
		Long userId=(Long)session.getAttribute("userId");
		if(userId==null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");
		}
		noteEntity.setUserId(userId);
		int id=simpleNoteService.addNote(noteEntity);
		
	
		return ResponseEntity.status(HttpStatus.CREATED).body(id);
	}
	
	@PutMapping("update/{id}")
	public ResponseEntity<?> updateNote(@PathVariable int id,@RequestBody NoteEntity noteEntity,HttpSession session)
	{
		
		Long userId=(Long)session.getAttribute("userId");
		
		if(userId==null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");	
		}
		noteEntity.setUserId(userId);
		int rowAffected=simpleNoteService.updateNote(id, noteEntity);
		if(rowAffected==0)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find the note with id : "+id);
		
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Updated Succesfully");
	}
	
	@DeleteMapping("delete/{id}")
	public ResponseEntity<?> deleteNote(@PathVariable int id,HttpSession session)
	{
		

		Long userId=(Long)session.getAttribute("userId");
		
		if(userId==null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");	
		}
		int rowAffected=simpleNoteService.deleteStudent(id,userId);
		if(rowAffected==0)
		{
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find the note with id : "+id);
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted Succesfully");
	}
	
	@GetMapping("getNotes")
	public ResponseEntity<?> getAllNotes(HttpSession session)
	{

		Long userId=(Long)session.getAttribute("userId");
		
		if(userId==null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");	
		}
		List<NoteEntity> noteEntities=simpleNoteService.getnotes(userId);
		if(noteEntities.isEmpty())
		{
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		
		}
		return ResponseEntity.status(HttpStatus.OK).body(noteEntities);
	}
	
	@GetMapping("getNote/{id}")
	public ResponseEntity<?> getNote(@PathVariable int id,HttpSession session)
	{

		Long userId=(Long)session.getAttribute("userId");
		
		if(userId==null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");	
		}
		NoteEntity noteEntity=simpleNoteService.getnote(id,userId);
		if(noteEntity==null)
			
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot Find Note with the id : "+id);
		}
		
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(noteEntity);
	}
	
	@GetMapping("getWithName/{title}")
	public ResponseEntity<?> getWithName(@PathVariable String title,HttpSession session)
	{
		Long userId=(Long)session.getAttribute("userId");
		
		if(userId==null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");	
		}
		NoteDto noteDto=simpleNoteService.getNoteWithTitle(title,userId);
		if(noteDto==null)
			
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Note with this title");
		}
		return ResponseEntity.status(HttpStatus.OK).body(noteDto);
	}
	
}
