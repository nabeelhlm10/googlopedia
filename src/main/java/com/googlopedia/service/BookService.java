package com.googlopedia.service;

import com.googlopedia.model.Book;
import com.googlopedia.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    public List<Book> searchBooks(String title) {
        return repository.findByTitleContainingIgnoreCase(title);
    }

    public Book getBookById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public Book saveBook(Book book) {
        return repository.save(book);
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = getBookById(id);
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPrice(bookDetails.getPrice());
        book.setDescription(bookDetails.getDescription());
        book.setImageUrl(bookDetails.getImageUrl());
        return repository.save(book);
    }

    public void deleteBook(Long id) {
        repository.deleteById(id);
    }
}
