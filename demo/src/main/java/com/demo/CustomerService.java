
package com.example.demo;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Customer register(String name, String email, String password) {
        String cleanName = name == null ? "" : name.trim();
        String cleanEmail = email == null ? "" : email.trim().toLowerCase();

        if (cleanName.isBlank() || cleanEmail.isBlank()
                || password == null || password.length() < 8) {
            throw new IllegalArgumentException(
                    "Name, email, and a password of at least 8 characters are required.");
        }

        if (customerRepository.existsByEmail(cleanEmail)) {
            throw new IllegalArgumentException(
                    "An account with this email already exists.");
        }

        Customer customer = new Customer();
        customer.setName(cleanName);
        customer.setEmail(cleanEmail);
        customer.setPassword(passwordEncoder.encode(password));
        customer.setRole("CUSTOMER");

        return customerRepository.save(customer);
    }
}
