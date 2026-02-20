package com.stis.statlegend.repository;

import com.stis.statlegend.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}
