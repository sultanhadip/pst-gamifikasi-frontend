package com.stis.statlegend.service;

import com.stis.statlegend.model.Level;
import com.stis.statlegend.model.Mission;
import com.stis.statlegend.model.User;
import com.stis.statlegend.model.UserMission;
import com.stis.statlegend.repository.LevelRepository;
import com.stis.statlegend.repository.UserMissionRepository;
import com.stis.statlegend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GamificationService {

    private final UserRepository userRepository;
    private final LevelRepository levelRepository;
    private final UserMissionRepository userMissionRepository;

    @Transactional
    public void addExperience(User user, int points) {
        // Update total progress
        // (Assuming we have a relation or field for total XP, let's use a field for
        // simplicity in this example)
        // For now we assume user has an implicit XP field or we use UserTotalProgress

        // Update streaks
        updateStreak(user);

        // Cek kenaikan level
        checkLevelUp(user);

        userRepository.save(user);
    }

    private void updateStreak(User user) {
        LocalDate today = LocalDate.now();
        if (user.getLastStreakDate() == null) {
            user.setStreaks(1);
        } else {
            LocalDate lastDate = user.getLastStreakDate().toLocalDate();
            if (lastDate.equals(today.minusDays(1))) {
                user.setStreaks(user.getStreaks() + 1);
            } else if (!lastDate.equals(today)) {
                user.setStreaks(1); // Reset if more than 1 day missed
            }
        }
        user.setLastStreakDate(LocalDateTime.now());
    }

    private void checkLevelUp(User user) {
        // Fetch all levels sorted by level number
        List<Level> allLevels = levelRepository.findAll();
        allLevels.sort(Comparator.comparingInt(Level::getLevelNumber));

        // Logic: Find the highest level where requirement <= current total points
        // Assuming user.points exists or we get it from total progress
        int currentXP = 500; // Placeholder for actual XP accumulation logic

        Level reachedLevel = user.getLevel();
        for (Level level : allLevels) {
            if (currentXP >= level.getExperienceRequired()) {
                reachedLevel = level;
            } else {
                break;
            }
        }
        user.setLevel(reachedLevel);
    }

    @Transactional
    public void addDiamonds(User user, int amount) {
        user.setDiamonds(user.getDiamonds() + amount);
        userRepository.save(user);
    }

    @Transactional
    public void updateMissionProgress(User user, Mission.MissionType type, int increment) {
        LocalDate today = LocalDate.now();

        // In a real scenario, we would iterate through all active daily missions of
        // this type
        List<UserMission> activeMissions = userMissionRepository.findByUserIdAndDate(user.getId(), today);

        for (UserMission um : activeMissions) {
            if (um.getMission().getType() == type && !um.getIsCompleted()) {
                um.setCurrentCount(um.getCurrentCount() + increment);

                if (um.getCurrentCount() >= um.getMission().getRequiredCount()) {
                    um.setIsCompleted(true);
                    um.setCompletedAt(LocalDateTime.now());
                }
                userMissionRepository.save(um);
            }
        }
    }
}
