package com.Aivleminiproject_04.book.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
// @Table(name = "Books")
public class Book {

    @Id
    private Long bookId; // Post의 postId 값을 여기에 저장하고 PK로 사용

    // Book이 Post에 의존
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    // Post의 PK(postId)를 FK로 가짐
    @MapsId // Post의 ID를 Book의 ID로 매핑
    @JoinColumn(name = "bookId")
    private Post post;

    // 아래 필드들 모두 Post 엔티티의 값으로 동기화
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    // Book은 직접 관계를 가지지 않고 Post에서 가져오기
    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private String publisher;

    private String coverImageUrl;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // 정적 메소드로 Post 엔티티로부터 Book 객체 쉽게 생성하기
    public static Book fromPost(Post post) {
        User postWriter = post.getWriter();

        return Book.builder()
                .post(post)
                .title(post.getTitle())
                .category(post.getCategory())
                .writer(postWriter != null ? postWriter.getUsername() : "Unknown")
                .publisher(post.getPublisher())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .coverImageUrl(post.getCoverImageUrl())  // 별도 로직 또는 Post에서 가져옴
                .build();
    }

    public void syncWithPost(Post post) {
        User postWriter = post.getWriter();

        this.title = post.getTitle();
        this.category = post.getCategory();
        this.writer = (postWriter != null ? postWriter.getUsername() : "Unknown");
        this.publisher = post.getPublisher();
        this.coverImageUrl = post.getCoverImageUrl();
        this.updatedAt = post.getUpdatedAt();
    }
}
