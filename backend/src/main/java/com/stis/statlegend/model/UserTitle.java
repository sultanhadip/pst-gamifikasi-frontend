package com.stis.statlegend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_titles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTitle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "title_id")
    private Title title;

    private Boolean unlocked;
    private LocalDateTime unlockedAt;
    
    @Builder.Default
    private Boolean isActive = false;
}
