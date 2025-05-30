package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.model.User;
import com.Aivleminiproject_04.book.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String email, String password) {
        return userRepository.save(User.builder()
                .uniqueId(UUID.randomUUID().toString())
                .email(email)
                .encrypted_password(encoder.encode(password))
                .role("USER")
                .build());
    }

    public boolean login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.isPresent() && encoder.matches(password, userOpt.get().getEncrypted_password());
    }
}
