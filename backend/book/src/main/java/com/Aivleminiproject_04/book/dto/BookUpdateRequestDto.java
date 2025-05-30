package com.Aivleminiproject_04.book.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookUpdateRequestDto {

    private String title;
    private String content;
    private String category;
    private String tag;
    private String coverImageUrl;
}
