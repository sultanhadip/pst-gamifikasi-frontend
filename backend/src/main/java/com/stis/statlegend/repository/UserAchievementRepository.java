package com.stis.statlegend.repository;

import com.stis.statlegend.model.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
    List<UserAchievement> findByUserId(UUID userId);
    Optional<UserAchievement> findByUserIdAndAchievementId(UUID userId, Long achievementId);
}
