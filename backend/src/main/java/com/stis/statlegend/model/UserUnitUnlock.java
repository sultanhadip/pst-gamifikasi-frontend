package com.stis.statlegend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_unit_unlock")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUnitUnlock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER) // Eager fetch to display unit info
    @JoinColumn(name = "unit_id")
    private Unit unit;

    private LocalDateTime unlockedAt;

    @PrePersist
    protected void onCreate() {
        unlockedAt = LocalDateTime.now();
    }
}
