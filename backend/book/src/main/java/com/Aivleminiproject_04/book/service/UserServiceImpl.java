package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.dto.UserLoginRequestDto;
import com.Aivleminiproject_04.book.dto.UserRegisterRequestDto;
import com.Aivleminiproject_04.book.dto.UserResponseDto;
import com.Aivleminiproject_04.book.domain.User;
import com.Aivleminiproject_04.book.exception.InvalidCredentialsException;
import com.Aivleminiproject_04.book.exception.ResourceNotFoundException;
import com.Aivleminiproject_04.book.repository.UserRepository;
import com.Aivleminiproject_04.book.util.JwtUtil;
import com.sun.jdi.request.DuplicateRequestException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    // private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    // 직접 생성 대신 Bean으로 등록된 PasswordEncoder 추천

    @Transactional
    public UserResponseDto register(UserRegisterRequestDto requestDto) {
        // 일단 이메일 중복만 막기, 작가 이름은 아직
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new DuplicateRequestException("Email address already in use: " + requestDto.getEmail());
        }

        User user = User.builder()
                .uniqueId(UUID.randomUUID().toString())
                .username(requestDto.getUsername())
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .role("USER")
                .build();

        User savedUser = userRepository.save(user);

        // DTO로 변환하여 반환
        return mapToUserResponseDto(savedUser);
    }

    @Transactional
    public String login(UserLoginRequestDto requestDto) {
        String email = requestDto.getEmail();
        String password = requestDto.getPassword();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User with email " + email + " not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException("비밀번호가 일치하지 않습니다.");
        }

        user.setLastSignInAt(LocalDateTime.now());
        userRepository.save(user);

        return jwtUtil.generateToken(email);
    }

    public UserResponseDto getUserInfoByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자 없음 (이메일: " + email + ")"));

        return mapToUserResponseDto(user);
    }

    public UserResponseDto getUserInfoByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다 (이름: " + username + ")"));

        return mapToUserResponseDto(user);
    }

    // User 엔티티를 UserResponseDto로 변환하는 헬퍼 메소드
    private UserResponseDto mapToUserResponseDto(User user) {
        return UserResponseDto.builder()
                .uniqueId(user.getUniqueId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .lastSignInAt(user.getLastSignInAt())
                .build();
    }
}
