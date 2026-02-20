package com.stis.statlegend.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stis.statlegend.model.User;
import com.stis.statlegend.model.VerificationToken;
import com.stis.statlegend.dto.request.LoginRequest;
import com.stis.statlegend.dto.request.SignupRequest;
import com.stis.statlegend.dto.response.JwtResponse;
import com.stis.statlegend.dto.response.MessageResponse;
import com.stis.statlegend.repository.UserRepository;
import com.stis.statlegend.repository.VerificationTokenRepository;
import com.stis.statlegend.security.jwt.JwtUtils;
import com.stis.statlegend.security.services.UserDetailsImpl;

import java.time.LocalDateTime;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	VerificationTokenRepository verificationTokenRepository;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = User.builder()
				.username(signUpRequest.getUsername())
				.email(signUpRequest.getEmail())
				.password(encoder.encode(signUpRequest.getPassword()))
				.name(signUpRequest.getName())
				.role(User.Role.USER)
				.build();

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestParam String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Email not found"));

		String token = UUID.randomUUID().toString();
		VerificationToken vToken = VerificationToken.builder()
				.user(user)
				.token(token)
				.type("PASSWORD_RESET")
				.expiryDate(LocalDateTime.now().plusHours(2))
				.build();
		verificationTokenRepository.save(vToken);

		// In real app, send email here
		return ResponseEntity.ok(new MessageResponse("Reset token generated: " + token));
	}

	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
		VerificationToken vToken = verificationTokenRepository.findByToken(token)
				.orElseThrow(() -> new RuntimeException("Invalid or expired token"));

		if (vToken.getExpiryDate().isBefore(LocalDateTime.now())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Token expired"));
		}

		User user = vToken.getUser();
		user.setPassword(encoder.encode(newPassword));
		userRepository.save(user);
		verificationTokenRepository.delete(vToken);

		return ResponseEntity.ok(new MessageResponse("Password reset successfully!"));
	}
}
