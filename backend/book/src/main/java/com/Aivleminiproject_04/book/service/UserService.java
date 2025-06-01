package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.dto.UserResponseDto;
import com.Aivleminiproject_04.book.domain.User;
import com.Aivleminiproject_04.book.repository.UserRepository;
import com.Aivleminiproject_04.book.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public User register(String email, String password) {
        return userRepository.save(User.builder()
                .uniqueId(UUID.randomUUID().toString())
                .email(email)
                .encrypted_password(encoder.encode(password))
                .role("USER")
                .build());
    }

    public String login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("존재하지 않는 이메일입니다.");
        }

        User user = userOpt.get();
        if (!encoder.matches(password, user.getEncrypted_password())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return jwtUtil.generateToken(email);
    }

    public UserResponseDto getUserInfo(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        return UserResponseDto.builder()
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
