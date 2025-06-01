package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.domain.Book;
import com.Aivleminiproject_04.book.domain.Post;
import com.Aivleminiproject_04.book.exception.UnauthorizedException;
import com.Aivleminiproject_04.book.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Override
    @Transactional
    public void deleteBook(Long bookId, String currentUsername) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));

        Post associatedPost = book.getPost();
        if (associatedPost == null) {
            throw new IllegalStateException("Book with id " + bookId + " has no associated post");
        }
        if (!associatedPost.getWriter().equals(currentUsername)) {
            throw new UnauthorizedException("당신은 이 책을 삭제할 수 없습니다.");
        }

        bookRepository.delete(book);
    }
}
