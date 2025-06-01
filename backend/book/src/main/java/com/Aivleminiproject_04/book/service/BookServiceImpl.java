package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.domain.Book;
import com.Aivleminiproject_04.book.dto.BookCreateRequestDto;
import com.Aivleminiproject_04.book.dto.BookResponseDto;
import com.Aivleminiproject_04.book.dto.BookUpdateRequestDto;
import com.Aivleminiproject_04.book.exception.BookNotFoundException;
import com.Aivleminiproject_04.book.repository.BookRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Override
    @Transactional
    public BookResponseDto createBook(BookCreateRequestDto requestDto, String writerName) {
        Book book =  requestDto.toEntity(writerName);
        Book savedBook = bookRepository.save(book);

        return new BookResponseDto(savedBook);
    }

    @Override
    @Transactional(readOnly = true)
    public BookResponseDto getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("해당 ID의 책을 찾을 수 없습니다: " + id));

        return new BookResponseDto(book);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookResponseDto> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(book -> new BookResponseDto(book))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookResponseDto updateBook(Long id, BookUpdateRequestDto requestDto) {
        Book book = bookRepository.findById(id)
                .orElseThrow();

        // DTO의 필드가 null이 아닐 경우에만 업데이트 (즉 부분 업데이트 지원)
        if (StringUtils.hasText(requestDto.getTitle()))
            book.setTitle(requestDto.getTitle());
        if (StringUtils.hasText(requestDto.getContent()))
            book.setContent(requestDto.getContent());
        if (StringUtils.hasText(requestDto.getTag()))
            book.setTag(requestDto.getTag());
        if (StringUtils.hasText(requestDto.getCoverImageUrl()))
            book.setCoverImageUrl(requestDto.getCoverImageUrl());

        return new BookResponseDto(bookRepository.save(book));
    }

    @Transactional
    @Override
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow();

//        if (!book.getWriter().equals(currentUsernname)) {
//            throw new UnauthorizedException("이 책을 삭제할 권한이 없습니다.");
//        }

        bookRepository.delete(book);
    }

    @Transactional
    @Override
    public BookResponseDto updateCoverImage(Long id, String imageUrl) {
        Book book = bookRepository.findById(id)
                .orElseThrow();

        // 권한 설정

        book.setCoverImageUrl(imageUrl);

        return new BookResponseDto(bookRepository.save(book));
    }
}
