package com.Aivleminiproject_04.book.controller;

import com.Aivleminiproject_04.book.dto.BookResponseDto;
import com.Aivleminiproject_04.book.service.BookService;
import com.Aivleminiproject_04.book.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import com.Aivleminiproject_04.book.service.BookService;
//import jakarta.validation.Valid;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.validation.annotation.Validated;
//import com.Aivleminiproject_04.book.dto.BookCreateRequestDto;
//import com.Aivleminiproject_04.book.dto.BookUpdateRequestDto;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
// @CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final PostService postService; // Post에 있는 Book(요약)을 가져오도록
    private final BookService bookService; // 책 삭제

    @GetMapping
    public ResponseEntity<List<BookResponseDto>> getAllBook() {
        List<BookResponseDto> books = postService.getAllBooks();

        return ResponseEntity.ok(books);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        String mockUsername = "testUser";

        bookService.deleteBook(id, mockUsername);

        return ResponseEntity.noContent().build();
    }
}

// Book 하나일 때
//class BookController {
//    private final BookService bookService;
//
//
//    @GetMapping
//    public ResponseEntity<List<BookResponseDto>> getAllBooks() {
//        List<BookResponseDto> books = bookService.getAllBooks();
//        return ResponseEntity.ok(books); // 200 OK
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<BookResponseDto> getBookById(@PathVariable Long id) {
//        BookResponseDto book = bookService.getBookById(id);
//
//        return ResponseEntity.ok(book); // 200 OK
//    }
//
//    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<BookResponseDto> createBook(@Valid @RequestBody BookCreateRequestDto requestDto) {
//        String mockWriterUsername = "tempUser";
//        BookResponseDto createdBook = bookService.createBook(requestDto, mockWriterUsername);
//
//        return new ResponseEntity<>(createdBook, HttpStatus.CREATED); // 201 Created
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<BookResponseDto> updateBook(@PathVariable Long id, @RequestBody BookUpdateRequestDto requestDto) {
//        String mockCurrentUsername = "tempUser";
//        BookResponseDto updateBook = bookService.updateBook(id, requestDto);
//
//        return ResponseEntity.ok(updateBook);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
//        // String currentUsername = userDetails.getUsername(); // 실제 사용자 정보
//        String mockCurrentUsername = "tempUser"; // 임시 사용자 이름
//        bookService.deleteBook(id);
//
//        return ResponseEntity.noContent().build(); // 204 No Content
//    }
//
//    @PatchMapping("/{id}/cover")
//    public ResponseEntity<BookResponseDto> updateBookCoverImage(
//            @PathVariable Long id,
//            @RequestBody Map<String, String> payload) { // 간단히 Map으로 받음
//        String imageUrl = payload.get("coverImageUrl");
//        // String currentUsername = userDetails.getUsername();
//        String mockCurrentUsername = "tempUser";
//        BookResponseDto updatedBook = bookService.updateCoverImage(id, imageUrl);
//        return ResponseEntity.ok(updatedBook);
//    }
//}
