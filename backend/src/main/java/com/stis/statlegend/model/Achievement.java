package com.stis.statlegend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "achievements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private String icon;
    
    private Integer rewardPoints;
    
    private Integer requiredProgress; // e.g. 5 (quizzes), 10 (publications)
    
    @Enumerated(EnumType.STRING)
    private AchievementType type;

    public enum AchievementType {
        QUIZ_COUNT, PUBLICATION_COUNT, STREAK_COUNT, LOGIN_COUNT, LEVEL_REACHED
    }
}
