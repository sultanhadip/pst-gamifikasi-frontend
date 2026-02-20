package com.stis.statlegend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "items_publication")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 2000)
    private String description;
    
    private String fileUrl;
    
    private String coverImage;
    
    @Builder.Default
    private Integer xpReward = 10;
}
