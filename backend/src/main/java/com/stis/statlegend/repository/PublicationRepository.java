package com.stis.statlegend.repository;

import com.stis.statlegend.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicationRepository extends JpaRepository<Publication, Long> {
}
