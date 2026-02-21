package com.googlopedia.controller;

import com.googlopedia.model.CartItem;
import com.googlopedia.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(Authentication auth) {
        return ResponseEntity.ok(service.getCartItems(auth.getName()));
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(
            Authentication auth,
            @RequestParam Long bookId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(service.addToCart(auth.getName(), bookId, quantity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long id) {
        service.removeFromCart(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(Authentication auth) {
        service.clearCart(auth.getName());
        return ResponseEntity.noContent().build();
    }
}
