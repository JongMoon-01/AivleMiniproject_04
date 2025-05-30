package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.dto.UserResponseDto;
import com.Aivleminiproject_04.book.model.User;
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
        if (userOpt.isPresent() && encoder.matches(password, userOpt.get().getEncrypted_password())) {
            // 로그인 성공 시 토큰 발급
            return jwtUtil.generateToken(email);  // jwt 발급
        }
        // 실패 시 null 반환 또는 예외 처리
        throw new RuntimeException("이메일 또는 비밀번호가 잘못되었습니다.");
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
