package com.stis.statlegend.service;

import com.stis.statlegend.model.User;
import com.stis.statlegend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> searchUsers(String keyword) {
        // Simple search by username or name containing keyword (case insensitive)
        List<User> users = userRepository.findAll().stream()
                .filter(u -> (u.getUsername().toLowerCase().contains(keyword.toLowerCase())) || 
                             (u.getName() != null && u.getName().toLowerCase().contains(keyword.toLowerCase())))
                .collect(Collectors.toList());
        return users;
    }
}
