package com.Aivleminiproject_04.book.repository;

import com.Aivleminiproject_04.book.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);
    // boolean existsByUsername(String username);
}