package com.Aivleminiproject_04.book.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(name = "unique_id")
    private String uniqueId;

    // 작가 이름 추가
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String role;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    private LocalDateTime emailConfirmedAt;
    private LocalDateTime lastSignInAt;

//    private String id;
//    private String instance_id;
//    private LocalDateTime invited_at;
//    private String confirmation_token;
//    private LocalDateTime confirmation_sent_at;
//    private String recovery_token;
//    private LocalDateTime recovery_sent_at;
}