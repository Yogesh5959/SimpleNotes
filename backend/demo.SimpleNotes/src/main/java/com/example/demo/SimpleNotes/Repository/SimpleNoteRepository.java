package com.example.demo.SimpleNotes.Repository;
import java.sql.PreparedStatement;
import java.sql.Statement;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import com.example.demo.SimpleNotes.Entity.NoteEntity;
@Repository
public class SimpleNoteRepository {
	public final JdbcTemplate simpleNoteTemplate;
	
	public SimpleNoteRepository(JdbcTemplate simpleJdbcTemplate)
	{
		this.simpleNoteTemplate=simpleJdbcTemplate;
	}
	public int addNote(NoteEntity noteEntity)
	{
		String sql="INSERT INTO notes(title,content,user_id) VALUES(?,?,?)";
		KeyHolder key = new GeneratedKeyHolder();

	    simpleNoteTemplate.update(con -> {
	        PreparedStatement ps = con.prepareStatement(sql,
	                Statement.RETURN_GENERATED_KEYS);

	        ps.setString(1, noteEntity.getTitle());
	        ps.setString(2, noteEntity.getContent());
	        ps.setLong(3, noteEntity.getUserId());

	        return ps;
	    }, key);
	    return key.getKey().intValue();
	}
	public int updateNote(int id,NoteEntity noteEntity)
	{
		
		String sql="UPDATE notes SET title=?,content=? WHERE id=? AND user_id=?";
		return simpleNoteTemplate.update(sql,noteEntity.getTitle(),noteEntity.getContent(),id,noteEntity.getUserId());
		
	}
	public int deleteNote(int id,long userId)
	{
		String sql="DELETE FROM notes WHERE id=? AND user_id=?";
		return simpleNoteTemplate.update(sql,id,userId);
	}
	
	public List<NoteEntity> getAllnotes(long userId)
	{
		String sql="SELECT * FROM notes WHERE user_id=?";
		return simpleNoteTemplate.query(sql,(rs,rowNum)->
		{
			NoteEntity noteEntity=new NoteEntity();
			noteEntity.setId(rs.getInt("id"));
			noteEntity.setTitle(rs.getString("title"));
			
			noteEntity.setContent(rs.getString("content"));
			return noteEntity;
		},userId);
	}
	public NoteEntity getNote(int id,long userId)
	{
		String sql="SELECT * FROM notes WHERE id=? AND user_id=?";
		
		return simpleNoteTemplate.queryForObject(sql, (rs,rowNum)->
		{
			NoteEntity noteEntity=new NoteEntity();
			
			noteEntity.setId(rs.getInt("id"));
			noteEntity.setTitle(rs.getString("title"));
			noteEntity.setContent(rs.getString("content"));
			return noteEntity;
		},id,userId);
	
	}
	public NoteEntity getNoteWithTitle(String title,long userId)
	{
		String sql="SELECT * FROM notes WHERE title=? AND user_id=?";
		
		return simpleNoteTemplate.queryForObject(sql, (rs,rowNum)->
		{
			NoteEntity noteEntity=new NoteEntity();
			
			noteEntity.setId(rs.getInt("id"));
			noteEntity.setUserId(rs.getLong("user_id"));
			noteEntity.setTitle(rs.getString("title"));
			noteEntity.setContent(rs.getString("content"));
			return noteEntity;
		},title,userId);
	}
	
}
