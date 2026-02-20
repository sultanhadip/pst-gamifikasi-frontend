package com.stis.statlegend.controller;

import com.stis.statlegend.dto.request.SubmitChallengeRequest;
import com.stis.statlegend.dto.request.UnlockUnitRequest;
import com.stis.statlegend.dto.response.ApiResponse;
import com.stis.statlegend.dto.response.ChallengeResult;
import com.stis.statlegend.dto.response.UnitResponse;
import com.stis.statlegend.model.*;
import com.stis.statlegend.repository.*;
import com.stis.statlegend.security.services.UserDetailsImpl;
import com.stis.statlegend.service.LearningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/courses")
public class LearningController {
    @Autowired
    CourseRepository courseRepository;
    
    @Autowired
    UnitRepository unitRepository;
    
    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    ChallengeRepository challengeRepository;

    @Autowired
    UserUnitUnlockRepository userUnitUnlockRepository;

    @Autowired
    LearningService learningService;

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Course is not found."));
        return ResponseEntity.ok(course);
    }
    
    @GetMapping("/{courseId}/units")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<UnitResponse> getUnitsByCourse(@PathVariable Long courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        List<Unit> units = unitRepository.findByCourseIdOrderByOrderIndexAsc(courseId);
        
        return units.stream().map(unit -> {
            boolean isLocked = false;
            if (unit.getUnlockCost() > 0) {
                isLocked = !userUnitUnlockRepository.existsByUserIdAndUnitId(userDetails.getId(), unit.getId());
            }
            return UnitResponse.builder()
                    .id(unit.getId())
                    .title(unit.getTitle())
                    .description(unit.getDescription())
                    .orderIndex(unit.getOrderIndex())
                    .unlockCost(unit.getUnlockCost())
                    .isLocked(isLocked)
                    .build();
        }).toList();
    }

    @GetMapping("/units/{unitId}/lessons")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Lesson> getLessonsByUnit(@PathVariable Long unitId) {
        return lessonRepository.findByUnitIdOrderByOrderIndexAsc(unitId);
    }
    
    @GetMapping("/lessons/{lessonId}/challenges")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Challenge> getChallengesByLesson(@PathVariable Long lessonId) {
        return challengeRepository.findByLessonIdOrderByOrderIndexAsc(lessonId);
    }

    @PostMapping("/units/unlock")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> unlockUnit(@RequestBody UnlockUnitRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        ApiResponse response = learningService.unlockUnit(userDetails.getId(), request.getUnitId());
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/lessons/challenges/submit")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ChallengeResult> submitAnswer(@RequestBody SubmitChallengeRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        ChallengeResult result = learningService.verifyAnswer(userDetails.getId(), request);
        return ResponseEntity.ok(result);
    }
}
