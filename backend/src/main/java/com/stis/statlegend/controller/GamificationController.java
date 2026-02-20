package com.stis.statlegend.controller;

import com.stis.statlegend.dto.response.MessageResponse;
import com.stis.statlegend.model.*;
import com.stis.statlegend.repository.*;
import com.stis.statlegend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.stis.statlegend.service.GamificationService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/gamification")
public class GamificationController {

    @Autowired
    AchievementRepository achievementRepository;

    @Autowired
    UserAchievementRepository userAchievementRepository;

    @Autowired
    TitleRepository titleRepository;

    @Autowired
    UserTitleRepository userTitleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMissionRepository userMissionRepository;

    @Autowired
    GamificationService gamificationService;

    // --- Achievements ---
    @GetMapping("/achievements")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    @GetMapping("/my-achievements")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<UserAchievement> getMyAchievements() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return userAchievementRepository.findByUserId(userDetails.getId());
    }

    // --- Titles ---
    @GetMapping("/titles")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Title> getAllTitles() {
        return titleRepository.findAll();
    }

    @GetMapping("/my-titles")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<UserTitle> getMyTitles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return userTitleRepository.findByUserId(userDetails.getId());
    }

    @PatchMapping("/set-title/{titleId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> setActiveTitle(@PathVariable Long titleId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        UserTitle targetTitle = userTitleRepository.findByUserIdAndTitleId(userDetails.getId(), titleId)
                .orElseThrow(() -> new RuntimeException("Title not unlocked yet"));

        // Deactivate all titles
        List<UserTitle> userTitles = userTitleRepository.findByUserIdAndIsActiveTrue(userDetails.getId());
        for (UserTitle t : userTitles) {
            t.setIsActive(false);
            userTitleRepository.save(t);
        }

        // Activate new title
        targetTitle.setIsActive(true);
        userTitleRepository.save(targetTitle);

        return ResponseEntity.ok(new MessageResponse("Title updated successfully!"));
    }

    // --- Missions ---
    @GetMapping("/missions/daily")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<UserMission> getDailyMissions() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return userMissionRepository.findByUserIdAndDate(userDetails.getId(), java.time.LocalDate.now());
    }

    @PostMapping("/missions/claim/{userMissionId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> claimMissionReward(@PathVariable Long userMissionId) {
        UserMission userMission = userMissionRepository.findById(userMissionId)
                .orElseThrow(() -> new RuntimeException("Mission progress not found"));

        if (!userMission.getIsCompleted()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Mission not completed yet"));
        }

        if (userMission.getIsClaimed()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Reward already claimed"));
        }

        User user = userMission.getUser();
        userMission.setIsClaimed(true);
        userMissionRepository.save(userMission);

        // Add Rewards
        gamificationService.addExperience(user, userMission.getMission().getRewardXp());
        gamificationService.addDiamonds(user, userMission.getMission().getRewardDiamonds());

        return ResponseEntity.ok(new MessageResponse("Reward claimed successfully!"));
    }
}
