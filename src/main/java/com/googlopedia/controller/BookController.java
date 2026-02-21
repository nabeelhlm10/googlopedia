package com.googlopedia.controller;

import com.googlopedia.model.Book;
import com.googlopedia.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {
    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks(@RequestParam(required = false) String title) {
        if (title != null) {
            return ResponseEntity.ok(service.searchBooks(title));
        }
        return ResponseEntity.ok(service.getAllBooks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getBookById(id));
    }
}
