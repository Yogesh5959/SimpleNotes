package com.example.demo.SimpleNotes.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.demo.SimpleNotes.Entity.Signup;

@Repository
public interface SignUpRepository extends JpaRepository<Signup, Long>{
	boolean existsByUserName(String userName);
	Signup findByUserName(String userName);
}
