package com.stis.statlegend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_total_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTotalProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder.Default
    private Integer points = 0;
    
    @Builder.Default
    private Integer publications = 0;
    
    @Builder.Default
    private Integer press = 0;
    
    @Builder.Default
    private Integer quizzes = 0;
    
    private LocalDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
