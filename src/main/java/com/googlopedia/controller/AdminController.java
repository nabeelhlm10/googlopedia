package com.googlopedia.controller;

import com.googlopedia.model.Article;
import com.googlopedia.model.Book;
import com.googlopedia.service.ArticleService;
import com.googlopedia.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {
    private final BookService bookService;
    private final ArticleService articleService;

    public AdminController(BookService bookService, ArticleService articleService) {
        this.bookService = bookService;
        this.articleService = articleService;
    }

    @PostMapping("/books")
    public ResponseEntity<Book> addBook(@Valid @RequestBody Book book) {
        return ResponseEntity.ok(bookService.saveBook(book));
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book book) {
        return ResponseEntity.ok(bookService.updateBook(id, book));
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/articles")
    public ResponseEntity<Article> addArticle(@Valid @RequestBody Article article) {
        return ResponseEntity.ok(articleService.saveArticle(article));
    }

    @PutMapping("/articles/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @Valid @RequestBody Article article) {
        return ResponseEntity.ok(articleService.updateArticle(id, article));
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}
