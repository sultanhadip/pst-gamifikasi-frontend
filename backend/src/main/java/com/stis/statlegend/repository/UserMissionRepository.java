package com.stis.statlegend.repository;

import com.stis.statlegend.model.UserMission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserMissionRepository extends JpaRepository<UserMission, Long> {
    List<UserMission> findByUserIdAndDate(UUID userId, LocalDate date);
    Optional<UserMission> findByUserIdAndMissionIdAndDate(UUID userId, Long missionId, LocalDate date);
}
