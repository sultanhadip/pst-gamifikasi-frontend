package com.stis.statlegend.repository;

import com.stis.statlegend.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepository extends JpaRepository<Mission, Long> {
}
