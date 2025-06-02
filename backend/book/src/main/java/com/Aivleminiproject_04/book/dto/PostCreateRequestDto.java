package com.Aivleminiproject_04.book.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostCreateRequestDto {
    @NotBlank(message = "제목은 필수입니다.")
    private String title;

    private String subTitle;

    @NotBlank(message = "설명은 필수입니다.")
    private String synopsis;

    @NotBlank(message = "작가의 말은 필수입니다.")
    private String comment;

    @NotBlank(message = "카테고리는 필수입니다.")
    private String category;

    @NotBlank(message = "내용은 필수입니다.")
    private String content;

    @NotBlank(message = "출판사는 필수입니다.")
    private String publisher;

    private String coverImageUrl;

    // writer는 인증 정보에서 가져옴
}
