package com.stis.statlegend.repository;

import com.stis.statlegend.model.UserTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserTitleRepository extends JpaRepository<UserTitle, Long> {
    List<UserTitle> findByUserId(UUID userId);
    Optional<UserTitle> findByUserIdAndTitleId(UUID userId, Long titleId);
    List<UserTitle> findByUserIdAndIsActiveTrue(UUID userId);
}
