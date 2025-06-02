package com.Aivleminiproject_04.book.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    // application.yml에서 주입
    @Value("${jwt.secret}")
    private String secretKeyString;
    // application.yml에서 주입
    @Value("${jwt.expiration.ms}")
    private long expirationTimeMs;

    private Key key;

    // Key 객체는 생성자 또는 @PostConstruct 메소드에서 한번 초기화하여 재사용하는 것이 효율적
    // Keys.hmacShaKeyFor()는 매번 호출할 필요가 없음
    public JwtUtil(@Value("${jwt.secret}") String secretKeyString) {
        this.secretKeyString = secretKeyString;
        this.key = Keys.hmacShaKeyFor(secretKeyString.getBytes());
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() +expirationTimeMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 클레임: 정보 조각
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);

        return claimsResolver.apply(claims);
    }

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);

        return expiration.before(new Date());
    }

    public boolean validateToken(String token, String userIdentifierFromDb) {
        try {
            final String identifierFromToken = getEmailFromToken(token);

            // 토큰 만료 여부 뿐만 아니라 토큰 추출 식별자와 DB 조회 식별자가 일치하는지 함께 검증
            return (identifierFromToken.equals(userIdentifierFromDb) && !isTokenExpired(token));
        } catch (JwtException e) {
            return false;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return !isTokenExpired(token);
        } catch (JwtException e) {
            return false;
        }
    }
}
