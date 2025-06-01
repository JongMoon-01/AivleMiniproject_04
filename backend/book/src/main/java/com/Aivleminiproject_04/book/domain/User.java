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

    private String instance_id;
    private String id;
    private String role;
    private String email;
    private String encrypted_password;

    private LocalDateTime email_confirmed_at;
    private LocalDateTime invited_at;
    private String confirmation_token;
    private LocalDateTime confirmation_sent_at;
    private String recovery_token;
    private LocalDateTime recovery_sent_at;
    private LocalDateTime last_sign_in_at;
}