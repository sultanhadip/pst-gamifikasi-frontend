package com.stis.statlegend.service;

import com.stis.statlegend.dto.request.SubmitChallengeRequest;
import com.stis.statlegend.dto.response.ChallengeResult;
import com.stis.statlegend.model.*;
import com.stis.statlegend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class LearningService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private UserUnitUnlockRepository userUnitUnlockRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private ChallengeOptionRepository challengeOptionRepository;
    
    @Autowired
    private ChallengeProgressRepository challengeProgressRepository;

    @Autowired
    private GamificationService gamificationService;

    @Transactional
    public ApiResponse unlockUnit(UUID userId, Long unitId) {
        // 1. Validasi User
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Validasi Unit
        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        // 3. Cek apakah sudah unlock sebelumnya
        if (userUnitUnlockRepository.existsByUserIdAndUnitId(userId, unitId)) {
            return new ApiResponse(false, "Unit already unlocked");
        }

        // 4. Cek Saldo Diamond
        if (user.getDiamonds() < unit.getUnlockCost()) {
            return new ApiResponse(false, "Insufficient diamonds. Cost: " + unit.getUnlockCost());
        }

        // 5. Transaksi (Kurangi Diamond & Catat Unlock)
        user.setDiamonds(user.getDiamonds() - unit.getUnlockCost());
        userRepository.save(user);

        UserUnitUnlock unlockRecord = UserUnitUnlock.builder()
                .user(user)
                .unit(unit)
                .build();
        userUnitUnlockRepository.save(unlockRecord);

        return new ApiResponse(true, "Unit unlocked successfully!", unlockRecord);
    }

    @Transactional
    public ChallengeResult verifyAnswer(UUID userId, SubmitChallengeRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Challenge challenge = challengeRepository.findById(request.getChallengeId())
                .orElseThrow(() -> new RuntimeException("Challenge not found"));

        ChallengeOption selectedOption = challengeOptionRepository.findByIdAndChallengeId(
                request.getSelectedOptionId(), request.getChallengeId())
                .orElseThrow(() -> new RuntimeException("Invalid option for this challenge"));

        boolean isCorrect = selectedOption.getCorrect();
        int pointsEarned = 0;

        if (isCorrect) {
            // Check if already completed to avoid duplicate points
            if (!challengeProgressRepository.existsByUserIdAndChallengeId(userId, challenge.getId())) {
                pointsEarned = 10; // Default points per challenge, can be dynamic
                
                // Save progress
                ChallengeProgress progress = ChallengeProgress.builder()
                        .user(user)
                        .challenge(challenge)
                        .completed(true)
                        .build();
                challengeProgressRepository.save(progress);

                // Add XP (and update level if needed)
                gamificationService.addExperience(user, pointsEarned);
                
                // Add Diamonds occasionally? (Optional logic)
                gamificationService.addDiamonds(user, 1);

                // Update Mission Progress
                gamificationService.updateMissionProgress(user, Mission.MissionType.COMPLETE_QUIZ, 1);
            }
            return new ChallengeResult(true, pointsEarned, "Correct Answer! Great Job!");
        } else {
            return new ChallengeResult(false, 0, "Incorrect Answer. Try again!");
        }
    }
}
