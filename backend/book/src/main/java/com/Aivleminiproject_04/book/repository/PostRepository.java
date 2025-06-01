package com.Aivleminiproject_04.book.repository;

import com.Aivleminiproject_04.book.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
