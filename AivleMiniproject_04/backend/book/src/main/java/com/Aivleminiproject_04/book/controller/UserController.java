package com.Aivleminiproject_04.book.controller;

import com.Aivleminiproject_04.book.service.UserService;
import com.Aivleminiproject_04.book.util.JwtUtil;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api")
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    // ✅ 생성자에서 jwtUtil 주입
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.register(request.getEmail(), request.getPassword()));
    }

    @PostMapping("/login")  // jwt login 구현으로 수정
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        boolean result = userService.login(request.getEmail(), request.getPassword());

        if (result) {
            String token = jwtUtil.generateToken(request.getEmail());
            return ResponseEntity.ok("Bearer " + token);
        } else {
            return ResponseEntity.status(401).body("로그인 실패");
        }
    }

    /* jwt login 전 코드
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        boolean result = userService.login(request.getEmail(), request.getPassword());
        return result ? ResponseEntity.ok("로그인 성공") : ResponseEntity.status(401).body("로그인 실패");
    }
    */

    // ✅ JWT 필터를 통해 인증된 사용자 정보 자동 주입
    @GetMapping("/secure")
    public ResponseEntity<?> secure(Authentication authentication) {
        String email = authentication.getName();  // 필터에서 설정한 사용자 정보
        return ResponseEntity.ok(email + "님, 인증 성공 (자동 필터)!");
    }

    /* 직접 토큰을 꺼내고 검증하던 방식, jwt 자동 필터 적용으로 개선
    @GetMapping("/secure")
    public ResponseEntity<?> secure(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // "Bearer " 제거
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.getEmailFromToken(token);
                return ResponseEntity.ok(email + "님, 인증 성공!");
            }
        }
        return ResponseEntity.status(401).body("인증 실패: 토큰이 없거나 유효하지 않음");
    }
    */

    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }
}