package com.stis.statlegend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "user_daily_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDailyProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate date;

    @Builder.Default
    private Integer points = 0;
    
    @Builder.Default
    private Integer publications = 0;
    
    @Builder.Default
    private Integer press = 0;
    
    @Builder.Default
    private Integer quizzes = 0;
}
