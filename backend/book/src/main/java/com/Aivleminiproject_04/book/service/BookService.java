package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.dto.BookCreateRequestDto;
import com.Aivleminiproject_04.book.dto.BookResponseDto;
import com.Aivleminiproject_04.book.dto.BookUpdateRequestDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookService {
    BookResponseDto createBook(BookCreateRequestDto requestDto, String writerName);
    BookResponseDto getBookById(Long id);
    List<BookResponseDto> getAllBooks();


    // 후에 수정, 삭제 권한 확인용 사용자 정보도 추가
    BookResponseDto updateBook(Long id, BookUpdateRequestDto requestDto);
    void deleteBook(Long id);
    BookResponseDto updateCoverImage(Long id, String imageUrl);

}
