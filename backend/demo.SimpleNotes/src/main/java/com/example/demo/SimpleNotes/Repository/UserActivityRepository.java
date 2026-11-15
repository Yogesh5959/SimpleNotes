package com.example.demo.SimpleNotes.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.SimpleNotes.Entity.UserActivity;
@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity,Long> {
	List<UserActivity> findByUserId(long userId);
	@Modifying
	@Transactional
	@Query("DELETE FROM UserActivity u WHERE u.userId = :userId")
	void deleteAllByUserId(@Param("userId") long userId);
}
