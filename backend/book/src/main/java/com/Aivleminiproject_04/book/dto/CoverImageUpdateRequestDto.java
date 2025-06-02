package com.Aivleminiproject_04.book.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

@Getter
@Setter
public class CoverImageUpdateRequestDto {
    @NotBlank(message = "커버 이미지 URL은 필수입니다.")
    @URL(message = "유효한 URL 형식이 아닙니다.")
    private String coverImageUrl;
}
