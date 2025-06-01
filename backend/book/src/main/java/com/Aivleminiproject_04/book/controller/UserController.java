package com.Aivleminiproject_04.book.controller;

import com.Aivleminiproject_04.book.dto.UserLoginRequestDto;
import com.Aivleminiproject_04.book.dto.UserLoginResponseDto;
import com.Aivleminiproject_04.book.dto.UserRegisterRequestDto;
import com.Aivleminiproject_04.book.dto.UserResponseDto;
import com.Aivleminiproject_04.book.service.UserService;
import com.Aivleminiproject_04.book.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")  // 여기에서 api/auth 설정
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequestDto requestDto) {
        userService.register(requestDto.getEmail(), requestDto.getPassword());
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")  // 최종 경로는 /api/auth/login
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto requestDto) {
        String token = userService.login(requestDto.getEmail(), requestDto.getPassword());
        UserResponseDto userInfo = userService.getUserInfo(requestDto.getEmail());

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
}