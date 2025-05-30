package com.Aivleminiproject_04.book.repository;

import com.Aivleminiproject_04.book.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
