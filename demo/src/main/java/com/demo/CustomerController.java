
package com.example.demo;

import java.util.Map;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class CustomerController {

    private final CustomerService customerService;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerController(
            CustomerService customerService,
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {
        try {
            Customer customer = customerService.register(
                request.name(), request.email(), request.password()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Registration successful",
                "id", customer.getId(),
                "name", customer.getName(),
                "email", customer.getEmail()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                Map.of("error", e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpSession session) {

        if (request.email() == null || request.password() == null) {
            return ResponseEntity.badRequest().body(
                Map.of("error", "Email and password are required.")
            );
        }

        Customer customer = customerRepository
            .findByEmail(request.email().trim().toLowerCase())
            .orElse(null);

        if (customer == null ||
                !passwordEncoder.matches(
                    request.password(), customer.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("error", "Invalid email or password.")
            );
        }

        session.setAttribute("customerId", customer.getId());
        session.setAttribute("customerEmail", customer.getEmail());
        session.setAttribute("customerName", customer.getName());

        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "id", customer.getId(),
            "name", customer.getName(),
            "email", customer.getEmail()
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> currentCustomer(HttpSession session) {
        Object customerId = session.getAttribute("customerId");

        if (customerId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("error", "Please log in first.")
            );
        }

        return ResponseEntity.ok(Map.of(
            "id", customerId,
            "name", session.getAttribute("customerName"),
            "email", session.getAttribute("customerEmail")
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(
            Map.of("message", "Logged out successfully")
        );
    }

    public record RegisterRequest(
        String name, String email, String password) {}

    public record LoginRequest(
        String email, String password) {}
}

