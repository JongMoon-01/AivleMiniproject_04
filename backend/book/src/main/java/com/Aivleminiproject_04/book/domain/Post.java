package com.Aivleminiproject_04.book.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
// @Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(nullable = false)
    private String title;

    private String subTitle;

    @Lob
    private String synopsis; // 책에 대한 설명

    @Column(nullable = false)
    private String comment; // 작가의 말

    @Lob // 긴 텍스트 내용
    @Column(nullable = false)
    private String content; // 책 내용

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String publisher; // 출판사

    private int views; // 조회수, 기본값 0

    @Column(nullable = false)
    // @ManyToOne(User userWriter;)
    private String writer;

    private String coverImageUrl; // Post 생성 시 이미지 URL도 생성/저장

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Book과 1:1 관계
    // Post가 저장/수정될 때 함께 처리하기 위해 Cascade 설정
    @OneToOne(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Book bookSummary; // 이 Post에 대한 요약 정보를 가진 Book
}
