package com.Aivleminiproject_04.book.dto;

import com.Aivleminiproject_04.book.domain.Book;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BookResponseDto {
    private Long bookId; // == postId
    private String title;
    private String category;
    private String writer;
    private String publisher;
    private String coverImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public BookResponseDto(Book book) {
        this.bookId = book.getBookId();
        this.title = book.getTitle();
        this.writer = book.getWriter();
        this.category = book.getCategory();
        this.publisher = book.getPublisher();
        this.coverImageUrl = book.getCoverImageUrl();
        this.createdAt = book.getCreatedAt();
        this.updatedAt = book.getUpdatedAt();
    }
}
