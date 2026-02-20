package com.stis.statlegend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String name;
    private String image;

    @Builder.Default
    private Integer diamonds = 0;

    @Builder.Default
    private Integer streaks = 0;

    private LocalDateTime lastStreakDate;

    @ManyToOne
    @JoinColumn(name = "level_id")
    private Level level;

    private Integer activeCourseId;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder.Default
    private Boolean banned = false;
    private String banReason;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum Role {
        USER, ADMIN
    }
}
