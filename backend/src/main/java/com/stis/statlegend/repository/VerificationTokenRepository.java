package com.stis.statlegend.repository;

import com.stis.statlegend.model.VerificationToken;
import com.stis.statlegend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
    Optional<VerificationToken> findByUser(User user);
}
