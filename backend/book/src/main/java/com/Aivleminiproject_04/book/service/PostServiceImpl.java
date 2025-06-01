package com.Aivleminiproject_04.book.service;

import com.Aivleminiproject_04.book.domain.Book;
import com.Aivleminiproject_04.book.domain.Post;
import com.Aivleminiproject_04.book.dto.BookResponseDto;
import com.Aivleminiproject_04.book.dto.PostCreateRequestDto;
import com.Aivleminiproject_04.book.dto.PostResponseDto;
import com.Aivleminiproject_04.book.dto.PostUpdateRequestDto;
import com.Aivleminiproject_04.book.exception.UnauthorizedException;
import com.Aivleminiproject_04.book.repository.BookRepository;
import com.Aivleminiproject_04.book.repository.PostRepository;
import com.Aivleminiproject_04.book.specification.BookSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final BookRepository bookRepository; // Book 엔티티도 관리해야하기 때문에

    @Override
    @Transactional
    public PostResponseDto createPost(PostCreateRequestDto requestDto, String username) {
        Post post = Post.builder()
                .title(requestDto.getTitle())
                .subTitle(requestDto.getSubTitle())
                .synopsis(requestDto.getSynopsis())
                .comment(requestDto.getComment())
                .content(requestDto.getContent())
                .category(requestDto.getCategory())
                .publisher(requestDto.getPublisher())
                .writer(username) // 실제로는 User 객체 조회 후 설정
                .coverImageUrl(requestDto.getCoverImageUrl()) // URL 직접 받거나 AI 생성 로직 추가
                .views(0) // 초기 조회수
                .build();

        Post savedPost = postRepository.save(post);

        // Post 저장 시 CascadeType.All에 의해 Book도 함께 처리될 수 있도록 Book 객체 생성 및 연결
        Book book = Book.fromPost(post);
        post.setBookSummary(book);

        return new PostResponseDto(savedPost);
    }

    @Override
    @Transactional
    public PostResponseDto getPostById(Long postId) {
        // 조회수 증가, DB용
        postRepository.incrementViews(postId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

        // 조회수 증가, 로컬 객체용
        // post.setViews(post.getViews() + 1);

        return new PostResponseDto(post);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookResponseDto> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(BookResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookResponseDto> searchAndFilterBooks(String titleKeyword, List<String> categories) {
        Specification<Book> spec = (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();

        if (titleKeyword != null && !titleKeyword.isEmpty()) {
            spec = spec.and(BookSpecification.titleContains(titleKeyword));
        }

        if (categories != null && !categories.isEmpty()) {
            spec = spec.and(BookSpecification.categoryIn(categories));
        }

        // Specification을 사용하여 BookRepository에서 조회
        List<Book> filteredBooks = bookRepository.findAll(spec);

        return filteredBooks.stream()
                .map(BookResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PostResponseDto updatePost(Long postId, PostUpdateRequestDto requestDto, String currentUsername) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

        if (!post.getWriter().equals(currentUsername)) {
            throw new UnauthorizedException("당신은 이 포스트를 수정할 수 없습니다.");
        }

        // 빈 문자열일 경우 업데이트 안 함
        if (StringUtils.hasText(requestDto.getTitle()))
            post.setTitle(requestDto.getTitle());
        if (StringUtils.hasText(requestDto.getSubTitle()))
            post.setSubTitle(requestDto.getSubTitle());
        if (StringUtils.hasText(requestDto.getSynopsis()))
            post.setSynopsis(requestDto.getSynopsis());
        if (StringUtils.hasText(requestDto.getComment()))
            post.setComment(requestDto.getComment());
        if (StringUtils.hasText(requestDto.getContent()))
            post.setContent(requestDto.getContent());
        if (StringUtils.hasText(requestDto.getCategory()))
            post.setCategory(requestDto.getCategory());
        if (StringUtils.hasText(requestDto.getPublisher()))
            post.setPublisher(requestDto.getPublisher());
        if (StringUtils.hasText(requestDto.getCoverImageUrl()))
            post.setCoverImageUrl(requestDto.getCoverImageUrl());

        // post.setUpdatedAt(LocalDateTime.now());

        Post updatedPost = postRepository.save(post);

        Book book = bookRepository.findById(updatedPost.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("연결된 책 찾을 수 없음 id: " + updatedPost.getPostId()));
        book.syncWithPost(updatedPost);
        bookRepository.save(book);

        return new PostResponseDto(updatedPost);
    }

    @Override
    @Transactional
    public void deletePost(Long postId, String currentUsername) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

        if (!post.getWriter().equals(currentUsername)) {
            throw new UnauthorizedException("당신은 이 포스트를 삭제할 수 없습니다.");
        }

        postRepository.delete(post);
    }
}
