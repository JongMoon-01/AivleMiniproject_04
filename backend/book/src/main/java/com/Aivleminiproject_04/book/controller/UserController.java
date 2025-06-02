package com.Aivleminiproject_04.book.controller;

import com.Aivleminiproject_04.book.dto.UserLoginRequestDto;
import com.Aivleminiproject_04.book.dto.UserLoginResponseDto;
import com.Aivleminiproject_04.book.dto.UserRegisterRequestDto;
import com.Aivleminiproject_04.book.dto.UserResponseDto;
import com.Aivleminiproject_04.book.service.UserService;
import com.Aivleminiproject_04.book.service.UserServiceImpl;
import com.Aivleminiproject_04.book.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")  // 여기에서 api/auth 설정
public class UserController {

    // private final JwtUtil jwtUtil;
    private final UserService userService;

    // 원본
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody UserRegisterRequestDto requestDto) {
//        userService.register(requestDto.getEmail(), requestDto.getPassword(), requestDto.getUsername());
//        return ResponseEntity.ok("회원가입 성공");
//    }

    @PostMapping("/signup")
    public ResponseEntity<String> register(@Valid @RequestBody UserRegisterRequestDto requestDto) {
        userService.register(requestDto);
        return ResponseEntity.ok("회원가입 성공");
    }

//    @PostMapping("/login")  // 최종 경로는 /api/auth/login
//    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto requestDto) {
//        String token = userService.login(requestDto.getEmail(), requestDto.getPassword());
//        UserResponseDto userInfo = userService.getUserInfo(requestDto.getEmail());
//
//        UserLoginResponseDto response = UserLoginResponseDto.builder()
//                .token(token)
//                .user(userInfo)
//                .build();
//
//        return ResponseEntity.ok(response);
//    }

    @PostMapping("/login")  // 최종 경로는 /api/auth/login
    public ResponseEntity<UserLoginResponseDto> login(@Valid @RequestBody UserLoginRequestDto requestDto) {
        String token = userService.login(requestDto);
        UserResponseDto userInfo = userService.getUserInfoByEmail(requestDto.getEmail());

        UserLoginResponseDto response = UserLoginResponseDto.builder()
                .token(token)
                .user(userInfo)
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/secure")
    public ResponseEntity<?> secure(Authentication authentication) {
        return ResponseEntity.ok(Map.of("email", authentication.getName()));
    }

    // 테스트용 또는 현재 로그인 사용자 정보 반환 API
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        String email = authentication.getName(); // == jwtUtil.getEmailFromToken(token);
        UserResponseDto userInfo = userService.getUserInfoByEmail(email);

        return ResponseEntity.ok(userInfo);
    }
}