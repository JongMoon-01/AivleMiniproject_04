package com.Aivleminiproject_04.book.controller;

import com.Aivleminiproject_04.book.dto.CoverImageUpdateRequestDto;
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
        String userEmail = authentication.getName();
        // authentication.getName()이 이름이 아닌 email을 가져옴
        // email이 현재 중복 허용되지 않는 값이니 email을 사용

        PostResponseDto createdPost = postService.createPost(requestDto, userEmail);

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
        // getName()이지만 중복 불가인 이메일 받아오도록 함
        String currentUserEmail = authentication.getName();

        PostResponseDto updatedPost = postService.updatePost(id, requestDto, currentUserEmail);

        return ResponseEntity.ok(updatedPost);
    }

    @PatchMapping("/{id}/cover")
    public ResponseEntity<PostResponseDto> updatePostCoverImage(@PathVariable Long id,
                                                                @Valid @RequestBody CoverImageUpdateRequestDto requestDto,
                                                                Authentication authentication) {
        String currentUserEmail = authentication.getName();

        PostResponseDto updatedPost = postService.updateCoverImage(id, requestDto.getCoverImageUrl(), currentUserEmail);

        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PostResponseDto> deletePost(@PathVariable Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("유저 권한 없음");
        }

        // Update와 동일
        String currentUserEmail = authentication.getName();

        postService.deletePost(id, currentUserEmail);

        return ResponseEntity.noContent().build();
    }
}
