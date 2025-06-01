package com.Aivleminiproject_04.book.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUpdateRequestDto {
    private String title;
    private String subTitle;
    private String synopsis;
    private String comment;
    private String content;
    private String category;
    private String publisher;
    private String coverImageUrl;
}
