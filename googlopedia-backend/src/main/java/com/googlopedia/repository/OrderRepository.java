package com.googlopedia.repository;

import com.googlopedia.model.Order;
import com.googlopedia.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
