package com.stis.statlegend.repository;

import com.stis.statlegend.model.UserTotalProgress;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserTotalProgressRepository extends JpaRepository<UserTotalProgress, Long> {
    Optional<UserTotalProgress> findByUserId(UUID userId);
    
    @Query("SELECT utp FROM UserTotalProgress utp ORDER BY " +
           "CASE WHEN :category = 'points' THEN utp.points " +
           "WHEN :category = 'publications' THEN utp.publications " +
           "WHEN :category = 'press' THEN utp.press " +
           "WHEN :category = 'quizzes' THEN utp.quizzes " +
           "ELSE utp.points END DESC")
    List<UserTotalProgress> findTopUsersByArea(String category, Pageable pageable);
}
