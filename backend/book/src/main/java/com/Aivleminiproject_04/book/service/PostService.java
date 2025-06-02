package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.dto.*;

import java.util.List;

public interface PostService {
    PostResponseDto createPost(PostCreateRequestDto requestDto, String userEmail);
    PostResponseDto getPostById(Long postId);
    List<PostResponseDto> getAllPosts(); // 여기에만 선언
    List<BookResponseDto> getAllBooks();
    List<BookResponseDto> searchAndFilterBooks(String titleKeyword, List<String> categories);
    PostResponseDto updatePost(Long postId, PostUpdateRequestDto requestDto, String currentUserEmail);
    void deletePost(Long postId, String currentUsername);
    PostResponseDto updateCoverImage(Long postId, String coverImageUrl, String currentUserEmail);
}
