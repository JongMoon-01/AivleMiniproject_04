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

@RestController
@RequestMapping("/api")
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // ✅ 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequestDto requestDto) {
        userService.register(requestDto.getEmail(), requestDto.getPassword());
        return ResponseEntity.ok("회원가입 성공");
    }

    // ✅ 로그인 + 사용자 정보 + JWT 발급
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto requestDto) {
        String token = userService.login(requestDto.getEmail(), requestDto.getPassword());
        UserResponseDto userInfo = userService.getUserInfo(requestDto.getEmail());

        UserLoginResponseDto response = UserLoginResponseDto.builder()
                .token("Bearer " + token)
                .user(userInfo)
                .build();

        return ResponseEntity.ok(response);
    }

    // ✅ 인증 확인 (자동 주입된 인증 객체 사용)
    @GetMapping("/secure")
    public ResponseEntity<?> secure(Authentication authentication) {
        String email = authentication.getName();  // JWT 필터를 통해 주입된 사용자 email
        return ResponseEntity.ok(email + "님, 인증 성공 (자동 필터)!");
    }
}