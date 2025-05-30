package com.Aivleminiproject_04.book.config;

import com.Aivleminiproject_04.book.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    // jwt 자동 필터 적용 위한 코드
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // jwt 자동 필터 적용 위한 코드
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }


    // 패스워드 인코더 Bean 등록
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // jwt 자동 필터 적용 위한 코드로 추가
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/api/login", "/api/register").permitAll()
                .anyRequest().authenticated()
                .and()
                .headers().frameOptions().disable()
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // ✅ 필터 등록

        return http.build();
    }

    /* 보안 비활성화 설정 + jwt 자동 필터 적용 위한 코드로 주석처리
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF 비활성화
                .authorizeHttpRequests()
                .requestMatchers("/h2-console/**").permitAll() // ✅ H2 콘솔 허용
                .requestMatchers("/**").permitAll() // 모든 요청 허용
                .anyRequest().permitAll()
                .and()
                .headers().frameOptions().disable() // ✅ H2 콘솔은 iframe을 사용하므로 허용
                .and()
                .formLogin().disable(); // 폼 로그인도 비활성화

        return http.build();
    }

    */
}