package com.stis.statlegend.repository;

import com.stis.statlegend.model.UserPublication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface UserPublicationRepository extends JpaRepository<UserPublication, Long> {
    Optional<UserPublication> findByUserIdAndPublicationId(UUID userId, Long publicationId);
}
