package com.Aivleminiproject_04.book.specification;

import com.Aivleminiproject_04.book.domain.Book;
import jakarta.persistence.criteria.*;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.List;

// Specification: 동적 쿼리를 타입 세이프하게 작성하는데 매우 유용 (Querydsl도 좋은 선택)
public class BookSpecification {
    public static Specification<Book> titleContains(String titleKeyword) {
        return (Root<Book> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            if (!StringUtils.hasText(titleKeyword)) {
                return null; // 검색어가 없으면 조건 추가 안 함
            }
            // Book 엔티티의 title 필드를 기준으로 검색
            return criteriaBuilder.like(root.get("title"), "%" + titleKeyword + "%");
        };
    }

    public static Specification<Book> categoryIn(List<String> categories) {
        return (Root<Book> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            if (categories == null || categories.isEmpty()) {
                return null;
            }
            return root.get("category").in(categories);
        };
    }
}
