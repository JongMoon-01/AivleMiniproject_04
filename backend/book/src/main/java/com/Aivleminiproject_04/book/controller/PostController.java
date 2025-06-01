package com.Aivleminiproject_04.book.controller;

import com.Aivleminiproject_04.book.dto.PostCreateRequestDto;
import com.Aivleminiproject_04.book.dto.PostResponseDto;
import com.Aivleminiproject_04.book.dto.PostUpdateRequestDto;
import com.Aivleminiproject_04.book.exception.UnauthorizedException;
import com.Aivleminiproject_04.book.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<PostResponseDto> createPost(@Valid @RequestBody PostCreateRequestDto requestDto, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("유저 권한 없음");
        }
        String username = authentication.getName();

        PostResponseDto createdPost = postService.createPost(requestDto, username);

        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long id) {
        PostResponseDto post = postService.getPostById(id);

        return ResponseEntity.ok(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDto> updatePost(@PathVariable Long id, @Valid @RequestBody PostUpdateRequestDto requestDto, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("유저 권한 없음");
        }
        String username = authentication.getName();

        PostResponseDto updatedPost = postService.updatePost(id, requestDto, username);

        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PostResponseDto> deletePost(@PathVariable Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("유저 권한 없음");
        }

        String username = authentication.getName();

        postService.deletePost(id, username);

        return ResponseEntity.noContent().build();
    }
}
