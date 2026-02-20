package com.stis.statlegend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "challenge_options")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String text;
    
    private Boolean correct;
    
    private String imageSrc;
    private String audioSrc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    @JsonIgnore
    private Challenge challenge;
}
