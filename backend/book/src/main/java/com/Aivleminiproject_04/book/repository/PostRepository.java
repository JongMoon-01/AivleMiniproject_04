package com.Aivleminiproject_04.book.repository;

import com.Aivleminiproject_04.book.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Modifying // UPDATE, DELETE 쿼리 실행 시 필요
    @Query("UPDATE Post p SET p.views = p.views + 1 WHERE p.postId = :postId")
    int incrementViews(@Param("postId") Long postId);
}
