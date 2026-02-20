package com.stis.statlegend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "items_brs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Brs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    private String category; // e.g., "Inflasi", "Ekspor-Impor"
    
    private LocalDate releaseDate;
    
    @Column(length = 2000)
    private String url;
    
    @Builder.Default
    private Integer xpReward = 5;
}
