package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.dto.BookResponseDto;
import com.Aivleminiproject_04.book.dto.PostCreateRequestDto;
import com.Aivleminiproject_04.book.dto.PostResponseDto;
import com.Aivleminiproject_04.book.dto.PostUpdateRequestDto;

import java.util.List;

public interface PostService {
    PostResponseDto createPost(PostCreateRequestDto requestDto, String userEmail);
    PostResponseDto getPostById(Long postId);
    List<BookResponseDto> getAllBooks();
    List<BookResponseDto> searchAndFilterBooks(String titleKeyword, List<String> categories);
    PostResponseDto updatePost(Long postId, PostUpdateRequestDto requestDto, String currentUserEmail);
    void deletePost(Long postId, String currentUsername);
    PostResponseDto updateCoverImage(Long postId, String coverImageUrl, String currentUserEmail);
    // 조회수 증가 메소드
    // void incrementViews(Long postId);
}
