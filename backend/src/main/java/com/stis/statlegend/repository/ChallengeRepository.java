package com.stis.statlegend.repository;

import com.stis.statlegend.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByLessonIdOrderByOrderIndexAsc(Long lessonId);
}
