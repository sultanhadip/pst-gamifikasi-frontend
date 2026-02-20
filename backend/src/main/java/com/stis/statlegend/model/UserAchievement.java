package com.stis.statlegend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_achievements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAchievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "achievement_id")
    private Achievement achievement;
    
    @Builder.Default
    private Integer currentProgress = 0;
    
    private Boolean isCompleted;
    private LocalDateTime completedAt;
}
