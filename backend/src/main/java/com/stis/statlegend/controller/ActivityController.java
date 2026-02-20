package com.stis.statlegend.controller;

import com.stis.statlegend.dto.response.ApiResponse;
import com.stis.statlegend.dto.response.MessageResponse;
import com.stis.statlegend.model.*;
import com.stis.statlegend.repository.*;
import com.stis.statlegend.security.services.UserDetailsImpl;
import com.stis.statlegend.service.GamificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    @Autowired
    PublicationRepository publicationRepository;
    
    @Autowired
    UserPublicationRepository userPublicationRepository;
    
    @Autowired
    BrsRepository brsRepository;
    
    @Autowired
    UserReadBrsRepository userReadBrsRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GamificationService gamificationService;

    // --- Publications ---
    @GetMapping("/publications")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }

    @PostMapping("/publications/{id}/read")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> readPublication(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication not found"));

        if (!userPublicationRepository.findByUserIdAndPublicationId(user.getId(), id).isPresent()) {
            UserPublication up = UserPublication.builder()
                    .user(user)
                    .publication(publication)
                    .isRead(true)
                    .readAt(LocalDateTime.now())
                    .build();
            userPublicationRepository.save(up);
            
            gamificationService.addExperience(user, publication.getXpReward());
            gamificationService.updateMissionProgress(user, Mission.MissionType.READ_PUBLICATION, 1);
            return ResponseEntity.ok(new MessageResponse("Publication read! XP Awarded."));
        }

        return ResponseEntity.ok(new MessageResponse("Already read."));
    }

    // --- BRS ---
    @GetMapping("/brs")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Brs> getAllBrs() {
        return brsRepository.findAll();
    }

    @PostMapping("/brs/{id}/read")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> readBrs(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        Brs brsItem = brsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BRS not found"));

        if (!userReadBrsRepository.findByUserIdAndBrsId(user.getId(), id).isPresent()) {
            UserReadBrs urb = UserReadBrs.builder()
                    .user(user)
                    .brs(brsItem)
                    .readAt(LocalDateTime.now())
                    .build();
            userReadBrsRepository.save(urb);
            
            gamificationService.addExperience(user, brsItem.getXpReward());
            gamificationService.updateMissionProgress(user, Mission.MissionType.READ_BRS, 1);
            return ResponseEntity.ok(new MessageResponse("BRS read! XP Awarded."));
        }

        return ResponseEntity.ok(new MessageResponse("Already read."));
    }
}
