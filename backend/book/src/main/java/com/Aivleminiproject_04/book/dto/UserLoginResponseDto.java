package com.Aivleminiproject_04.book.dto;
// 로그인 성공시 응답으로 줄 token과 사용자 정보 담는 user 객체 같이 반환

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginResponseDto {

    private String token;
    private UserResponseDto user;

}
