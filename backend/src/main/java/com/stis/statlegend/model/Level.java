package com.stis.statlegend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "levels")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer levelNumber;

    @Column(nullable = false)
    private Integer experienceRequired;

    @Builder.Default
    private Integer rewardDiamonds = 0;

    private String quote;
}
