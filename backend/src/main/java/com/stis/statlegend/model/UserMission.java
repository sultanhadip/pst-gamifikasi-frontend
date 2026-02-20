package com.stis.statlegend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_missions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_id")
    private Mission mission;

    private LocalDate date; // For daily missions
    
    @Builder.Default
    private Integer currentCount = 0;
    
    @Builder.Default
    private Boolean isCompleted = false;
    
    @Builder.Default
    private Boolean isClaimed = false;
    
    private LocalDateTime completedAt;
}
