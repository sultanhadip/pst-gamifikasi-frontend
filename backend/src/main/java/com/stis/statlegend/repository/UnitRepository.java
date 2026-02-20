package com.stis.statlegend.repository;

import com.stis.statlegend.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    List<Unit> findByCourseIdOrderByOrderIndexAsc(Long courseId);
}
