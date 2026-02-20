package com.stis.statlegend.repository;

import com.stis.statlegend.model.UserReadBrs;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface UserReadBrsRepository extends JpaRepository<UserReadBrs, Long> {
    Optional<UserReadBrs> findByUserIdAndBrsId(UUID userId, Long brsId);
}
