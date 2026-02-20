package com.stis.statlegend.repository;

import com.stis.statlegend.model.UserDailyProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public interface UserDailyProgressRepository extends JpaRepository<UserDailyProgress, Long> {
    Optional<UserDailyProgress> findByUserIdAndDate(UUID userId, LocalDate date);
}
