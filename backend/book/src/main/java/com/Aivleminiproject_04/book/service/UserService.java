package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.dto.UserLoginRequestDto;
import com.Aivleminiproject_04.book.dto.UserRegisterRequestDto;
import com.Aivleminiproject_04.book.dto.UserResponseDto;

public interface UserService {
    UserResponseDto register(UserRegisterRequestDto requestDto);
    String login(UserLoginRequestDto requestDto);
    UserResponseDto getUserInfoByEmail(String email);
    public UserResponseDto getUserInfoByUsername(String username);
}
