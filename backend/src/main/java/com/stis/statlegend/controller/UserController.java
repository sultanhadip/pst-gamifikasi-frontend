package com.stis.statlegend.controller;

import com.stis.statlegend.dto.response.MessageResponse;
import com.stis.statlegend.model.User;
import com.stis.statlegend.model.UserTotalProgress;
import com.stis.statlegend.repository.UserRepository;
import com.stis.statlegend.repository.UserTotalProgressRepository;
import com.stis.statlegend.security.services.UserDetailsImpl;
import com.stis.statlegend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserTotalProgressRepository userTotalProgressRepository;

    @Autowired
    UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));

        return ResponseEntity.ok(user);
    }

    @PatchMapping("/me/update")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));

        // Update fields if they are present in request
        if (updatedUser.getName() != null)
            user.setName(updatedUser.getName());
        if (updatedUser.getImage() != null)
            user.setImage(updatedUser.getImage());
        // Add more fields as needed

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Profile updated successfully!"));
    }

    @PostMapping("/me/add-password")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addPassword(@RequestParam String newPassword) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Password added successfully!"));
    }

    @PatchMapping("/me/active-course")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> setActiveCourse(@RequestParam Integer courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId()).orElseThrow();
        user.setActiveCourseId(courseId);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Active course updated!"));
    }

    @GetMapping("/me/progress")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getMyProgress() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserTotalProgress progress = userTotalProgressRepository.findByUserId(userDetails.getId())
                .orElse(UserTotalProgress.builder().points(0).publications(0).press(0).quizzes(0).build());

        return ResponseEntity.ok(progress);
    }

    @GetMapping("/leaderboard")
    public List<UserTotalProgress> getLeaderboard(@RequestParam(defaultValue = "points") String category) {
        Pageable topTen = PageRequest.of(0, 10);
        return userTotalProgressRepository.findTopUsersByArea(category, topTen);
    }

    @GetMapping("/users/search")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<User> searchUsers(@RequestParam("q") String query) {
        return userService.searchUsers(query);
    }
}
