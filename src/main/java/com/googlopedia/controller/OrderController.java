package com.googlopedia.controller;

import com.googlopedia.model.Order;
import com.googlopedia.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(Authentication auth) {
        return ResponseEntity.ok(service.placeOrder(auth.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(Authentication auth) {
        return ResponseEntity.ok(service.getUserOrders(auth.getName()));
    }
}
