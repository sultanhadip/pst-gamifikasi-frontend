package com.stis.statlegend.controller;

import com.stis.statlegend.dto.response.MessageResponse;
import com.stis.statlegend.model.User;
import com.stis.statlegend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final String UPLOAD_DIR = "uploads/";

    @Autowired
    UserRepository userRepository;

    @PostMapping("/upload-avatar")
    public ResponseEntity<?> uploadAvatar(@RequestParam("file") MultipartFile file, @RequestParam("userId") UUID userId) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Please select a file to upload"));
        }

        try {
            // Create directory if not exists
            Path uploadPath = Paths.get(UPLOAD_DIR + "avatars/");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save file
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            // Update user profile
            User user = userRepository.findById(userId).orElseThrow();
            user.setImage("/api/media/avatars/" + fileName);
            userRepository.save(user);

            return ResponseEntity.ok(new MessageResponse("Avatar uploaded successfully: " + fileName));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(new MessageResponse("Could not upload file: " + e.getMessage()));
        }
    }
}
