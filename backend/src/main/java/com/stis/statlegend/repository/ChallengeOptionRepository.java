package com.stis.statlegend.repository;

import com.stis.statlegend.model.ChallengeOption;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ChallengeOptionRepository extends JpaRepository<ChallengeOption, Long> {
    Optional<ChallengeOption> findByIdAndChallengeId(Long id, Long challengeId);
}
