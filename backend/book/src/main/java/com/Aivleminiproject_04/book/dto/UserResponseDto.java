package com.Aivleminiproject_04.book.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String uniqueId;
    private String username;
    private String email;
    private String role;
    private LocalDateTime lastSignInAt;
}