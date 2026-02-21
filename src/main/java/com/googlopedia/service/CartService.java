package com.googlopedia.service;

import com.googlopedia.model.Book;
import com.googlopedia.model.CartItem;
import com.googlopedia.model.User;
import com.googlopedia.repository.CartItemRepository;
import com.googlopedia.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final BookService bookService;
    private final UserRepository userRepository;

    public CartService(CartItemRepository cartItemRepository, BookService bookService, UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.bookService = bookService;
        this.userRepository = userRepository;
    }

    public List<CartItem> getCartItems(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return cartItemRepository.findByUser(user);
    }

    public CartItem addToCart(String username, Long bookId, Integer quantity) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Book book = bookService.getBookById(bookId);

        var existingItem = cartItemRepository.findByUserAndBook(user, book);
        if (existingItem.isPresent()) {
            var item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepository.save(item);
        }

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setBook(book);
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Transactional
    public void clearCart(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        cartItemRepository.deleteByUser(user);
    }
}
