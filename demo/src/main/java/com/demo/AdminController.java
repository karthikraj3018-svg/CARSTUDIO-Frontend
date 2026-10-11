
package com.example.demo;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final CustomerRepository customerRepository;
    private final CarOrderRepository orderRepository;

    public AdminController(
            CustomerRepository customerRepository,
            CarOrderRepository orderRepository) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard(HttpSession session) {
        requireAdmin(session);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalCustomers", customerRepository.count());
        result.put("totalOrders", orderRepository.count());
        result.put("message", "Admin dashboard loaded.");

        return result;
    }

    @GetMapping("/customers")
    public List<Map<String, Object>> customers(HttpSession session) {
        requireAdmin(session);

        return customerRepository.findAll().stream()
                .map(customer -> {
                    Map<String, Object> item = new LinkedHashMap<>();
                    item.put("id", customer.getId());
                    item.put("name", customer.getName());
                    item.put("email", customer.getEmail());
                    item.put("role", customer.getRole());
                    return item;
                })
                .toList();
    }

    @GetMapping("/orders")
    public List<Map<String, Object>> orders(HttpSession session) {
        requireAdmin(session);

        return orderRepository.findAllByOrderByOrderDateDesc().stream()
                .map(order -> {
                    Map<String, Object> item = new LinkedHashMap<>();
                    item.put("id", order.getId());
                    item.put("customerId", order.getCustomer().getId());
                    item.put("customerName", order.getCustomer().getName());
                    item.put("customerEmail", order.getCustomer().getEmail());
                    item.put("carName", order.getCarName());
                    item.put("customization", order.getCustomization());
                    item.put("price", order.getPrice());
                    item.put("status", order.getStatus());
                    item.put("orderDate", order.getOrderDate());
                    return item;
                })
                .toList();
    }

    private void requireAdmin(HttpSession session) {
        Object role = session.getAttribute("customerRole");

        if (!"ADMIN".equals(role)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Admin access required.");
        }
    }
}
