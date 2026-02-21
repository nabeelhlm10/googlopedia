package com.googlopedia.controller;

import com.googlopedia.model.Book;
import com.googlopedia.model.Review;
import com.googlopedia.model.User;
import com.googlopedia.repository.BookRepository;
import com.googlopedia.repository.ReviewRepository;
import com.googlopedia.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/book/{bookId}")
    public List<Review> getReviewsByBook(@PathVariable Long bookId) {
        return reviewRepository.findByBookIdOrderByReviewDateDesc(bookId);
    }

    @PostMapping
    public ResponseEntity<?> addReview(@Valid @RequestBody ReviewRequest reviewRequest, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("User must be logged in to review");
        }

        User user = userRepository.findByUsername(principal.getName()).orElse(null);
        Book book = bookRepository.findById(reviewRequest.getBookId()).orElse(null);

        if (user == null || book == null) {
            return ResponseEntity.badRequest().body("Invalid user or book");
        }

        Review review = new Review();
        review.setUser(user);
        review.setBook(book);
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());

        return ResponseEntity.ok(reviewRepository.save(review));
    }

    public static class ReviewRequest {
        @NotNull(message = "Book ID is required")
        private Long bookId;

        @NotNull(message = "Rating is required")
        @Min(value = 1, message = "Rating must be at least 1")
        @Max(value = 5, message = "Rating must be at most 5")
        private Integer rating;

        @NotBlank(message = "Comment is required")
        @Size(min = 10, message = "Comment must be at least 10 characters")
        private String comment;

        public Long getBookId() {
            return bookId;
        }

        public void setBookId(Long bookId) {
            this.bookId = bookId;
        }

        public Integer getRating() {
            return rating;
        }

        public void setRating(Integer rating) {
            this.rating = rating;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }
    }
}
