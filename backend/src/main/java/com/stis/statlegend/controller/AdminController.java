package com.stis.statlegend.controller;

import com.stis.statlegend.dto.response.MessageResponse;
import com.stis.statlegend.model.*;
import com.stis.statlegend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    CourseRepository courseRepository;
    
    @Autowired
    PublicationRepository publicationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UnitRepository unitRepository;

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    ChallengeRepository challengeRepository;

    // --- Courses Management ---
    @PostMapping("/courses")
    public Course createCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }
    
    @PutMapping("/courses/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Course course = courseRepository.findById(id).orElseThrow();
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setImageSrc(courseDetails.getImageSrc());
        return courseRepository.save(course);
    }
    
    @DeleteMapping("/courses/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Course deleted successfully!"));
    }

    // --- Units Management ---
    @PostMapping("/units")
    public Unit createUnit(@RequestBody Unit unit) {
        return unitRepository.save(unit);
    }

    @PutMapping("/units/{id}")
    public Unit updateUnit(@PathVariable Long id, @RequestBody Unit unitDetails) {
        Unit unit = unitRepository.findById(id).orElseThrow();
        unit.setTitle(unitDetails.getTitle());
        unit.setDescription(unitDetails.getDescription());
        unit.setUnlockCost(unitDetails.getUnlockCost());
        return unitRepository.save(unit);
    }

    @DeleteMapping("/units/{id}")
    public ResponseEntity<?> deleteUnit(@PathVariable Long id) {
        unitRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Unit deleted successfully!"));
    }

    // --- Lessons Management ---
    @PostMapping("/lessons")
    public Lesson createLesson(@RequestBody Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    @DeleteMapping("/lessons/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable Long id) {
        lessonRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Lesson deleted successfully!"));
    }

    // --- Challenges Management ---
    @PostMapping("/challenges")
    public Challenge createChallenge(@RequestBody Challenge challenge) {
        return challengeRepository.save(challenge);
    }

    @DeleteMapping("/challenges/{id}")
    public ResponseEntity<?> deleteChallenge(@PathVariable Long id) {
        challengeRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Challenge deleted successfully!"));
    }

    // --- Users Management ---
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PatchMapping("/users/{id}/ban")
    public ResponseEntity<?> banUser(@PathVariable java.util.UUID id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setBanned(true);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User banned successfully!"));
    }
    
    @PatchMapping("/users/{id}/unban")
    public ResponseEntity<?> unbanUser(@PathVariable java.util.UUID id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setBanned(false);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User unbanned successfully!"));
    }
}
