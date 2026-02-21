package com.googlopedia.service;

import com.googlopedia.model.CartItem;
import com.googlopedia.model.Order;
import com.googlopedia.model.User;
import com.googlopedia.repository.OrderRepository;
import com.googlopedia.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, CartService cartService, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order placeOrder(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        List<CartItem> cartItems = cartService.getCartItems(username);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double total = cartItems.stream()
                .mapToDouble(item -> item.getBook().getPrice() * item.getQuantity())
                .sum();

        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(total);
        order.setStatus("PLACED");

        Order savedOrder = orderRepository.save(order);
        cartService.clearCart(username);
        return savedOrder;
    }

    public List<Order> getUserOrders(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return orderRepository.findByUser(user);
    }
}
