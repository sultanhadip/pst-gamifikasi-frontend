package com.stis.statlegend.repository;

import com.stis.statlegend.model.ChallengeProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.Optional;

public interface ChallengeProgressRepository extends JpaRepository<ChallengeProgress, Long> {
    Optional<ChallengeProgress> findByUserIdAndChallengeId(UUID userId, Long challengeId);
    boolean existsByUserIdAndChallengeId(UUID userId, Long challengeId);
}
