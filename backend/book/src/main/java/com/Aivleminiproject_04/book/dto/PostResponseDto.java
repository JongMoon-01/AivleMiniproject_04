package com.Aivleminiproject_04.book.dto;

import com.Aivleminiproject_04.book.domain.Post;
import lombok.Getter;

import java.time.LocalDateTime;

// 단일 Post 정보 응답
@Getter
public class PostResponseDto {
    private Long postId;
    private String title;
    private String subTitle;
    private String synopsis;
    private String comment;
    private String content;
    private String category;
    private String publisher;
    private int views;
    private String writer;
    private String coverImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PostResponseDto(Post post) {
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.subTitle = post.getSubTitle();
        this.synopsis = post.getSynopsis();
        this.comment = post.getComment();
        this.content = post.getContent();
        this.category = post.getCategory();
        this.publisher = post.getPublisher();
        this.views = post.getViews();
        this.writer = post.getWriter();
        this.coverImageUrl = post.getCoverImageUrl();
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
    }
}
