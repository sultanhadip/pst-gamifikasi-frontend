package com.stis.statlegend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "titles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Title {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private String requirement; // Text description of requirement
    
    // In complex system, we would have TitleRequirements table linked here
}
