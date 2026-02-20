package com.stis.statlegend.repository;

import com.stis.statlegend.model.UserUnitUnlock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserUnitUnlockRepository extends JpaRepository<UserUnitUnlock, Long> {
    Optional<UserUnitUnlock> findByUserIdAndUnitId(UUID userId, Long unitId);
    boolean existsByUserIdAndUnitId(UUID userId, Long unitId);
}
