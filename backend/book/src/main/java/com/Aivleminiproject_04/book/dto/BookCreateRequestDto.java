package com.Aivleminiproject_04.book.dto;

import com.Aivleminiproject_04.book.domain.Book;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookCreateRequestDto {

    @NotBlank(message = "제목은 필수 입력 항목입니다.")
    private String title;

    @NotBlank(message = "내용은 필수 입력 항목입니다.")
    private String content;

    private String category;
    private String tag;

    public Book toEntity(String writerUsername) {

        return Book.builder()
                .title(this.title)
                .content(this.content)
                .category(this.category)
                .tag(this.tag)
                .writer(writerUsername)
                .build();
    }
}
