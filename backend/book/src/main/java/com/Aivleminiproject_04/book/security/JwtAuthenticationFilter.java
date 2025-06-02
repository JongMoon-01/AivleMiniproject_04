package com.Aivleminiproject_04.book.security;

import com.Aivleminiproject_04.book.domain.User;
import com.Aivleminiproject_04.book.repository.UserRepository;
import com.Aivleminiproject_04.book.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // final 추가
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // "/api/auth/login", "/api/auth/register" 등의 경로는 필터링하지 않도록 SecurityConfig에서 설정되어야 함
        // 이 필터는 인증이 필요한 요청에 대해서만 토큰을 검사.
        // 만약 SecurityConfig에서 permitAll()로 지정된 경로라면 이 필터는 통과할 수 있지만,
        // 토큰이 있어도 굳이 인증 객체를 만들 필요는 없을 수 있음. (현재 로직은 토큰이 있으면 무조건 검증 시도)

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7); // "Bearer " 다음부터 토큰 추출
        // System.out.println("🔐 추출된 JWT: " + jwt);

        // jwtUtil.getEmailFromToken(jwt) 호출 시 발생할 수 있는 예외(토큰 만료, 형식 오류 등)를 try-catch로 처리
        try {
            userEmail = jwtUtil.getEmailFromToken(jwt);
            // System.out.println("✅ 파싱된 사용자 이메일: " + userEmail);
        } catch (Exception e) {
            // System.err.println("❌ JWT 파싱 오류: " + e.getMessage());
            // response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
            filterChain.doFilter(request, response);

            return;
        }

        // SecurityContextHolder.getContext().getAuthentication() == null 은 현재 사용자가 아직 인증되지 않았음을 의미
        if (userEmail != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByEmail(userEmail)
                    .orElse(null);

            if (user != null && jwtUtil.validateToken(jwt, user.getEmail())) {
                // ✅ validateToken에 사용자 정보도 넘겨 일치 여부 확인 가능 (선택적)
                // UserDetails를 직접 사용하지 않고, User 엔티티에서 직접 권한 정보를 가져옴
                // User 엔티티의 role 필드를 기반으로 GrantedAuthority 생성
                // 예: user.getRole()이 "USER"라면, "ROLE_USER"로 만들어야 Spring Security가 인식
                String role = "ROLE_" + user.getRole().toUpperCase(); // "ROLE_USER", "ROLE_ADMIN" 형태로

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                user.getEmail(), // Principal: 보통 사용자 식별자 (이메일 또는 User 객체 자체)
                                null,            // Credentials: JWT 방식에서는 보통 null
                                Collections.singletonList(new SimpleGrantedAuthority(role)) // Authorities
                        );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken); // SecurityContext에 인증 정보 저장
            } else {
                // System.err.println("❌ 사용자 정보가 없거나 토큰이 유효하지 않음 (사용자 이메일: " + userEmail + ")");
            }
        }
        filterChain.doFilter(request, response); // 다음 필터 실행
    }
}



        // 원본
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            String token = authHeader.substring(7);
//            System.out.println("🔐 추출된 JWT: " + token);
//
//            if (jwtUtil.validateToken(token)) {
//                String email = jwtUtil.getEmailFromToken(token);
//                System.out.println("✅ 파싱된 사용자 이메일: " + email);
//
//                User user = userRepository.findByEmail(email)
//                        .orElseThrow(() -> new RuntimeException("사용자 없음"));
//
//                String role = user.getRole(); // 예: USER
//                String fullRole = "ROLE_" + role; // 예: ROLE_USER
//
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(
//                                email, null,
//                                Collections.singletonList(new SimpleGrantedAuthority("USER"))  // ← 수정 포인트
//                        );
//
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        }
//
//        filterChain.doFilter(request, response);
//    }
