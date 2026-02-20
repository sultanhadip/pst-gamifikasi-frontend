package com.stis.statlegend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "missions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    
    @Enumerated(EnumType.STRING)
    private MissionType type; // e.g., READ_PUBLICATION, COMPLETE_QUIZ, DAILY_LOGIN
    
    private Integer requiredCount;
    private Integer rewardXp;
    private Integer rewardDiamonds;

    public enum MissionType {
        READ_PUBLICATION, COMPLETE_QUIZ, DAILY_LOGIN, READ_BRS
    }
}
