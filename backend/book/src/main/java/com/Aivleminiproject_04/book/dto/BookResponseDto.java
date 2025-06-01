package com.Aivleminiproject_04.book.dto;

import com.Aivleminiproject_04.book.domain.Book;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BookResponseDto {
    private Long bookId;
    private String title;
    private String content;
    private String category;
    private String tag;
    private String coverImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String writer; // 또는 UserResponseDto writer;

    // Entity를 DTO로 변환하는 생성자 (Service에서 사용)
    public BookResponseDto(Book book) {
        this.bookId = book.getBookId();
        this.title = book.getTitle();
        this.content = book.getContent();
        this.category = book.getCategory();
        this.tag = book.getTag();
        this.coverImageUrl = book.getCoverImageUrl();
        this.createdAt = book.getCreatedAt();
        this.updatedAt = book.getUpdatedAt();
        this.writer = book.getWriter(); // 또는 new UserResponseDto(book.getWriter());
    }
}
