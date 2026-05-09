package com.ai.ats.Controller;

import com.ai.ats.Entity.User;
import com.ai.ats.Repository.UserRepository;
import com.ai.ats.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository repo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository repo,
                          JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // ✅ CHECK IF EMAIL EXISTS
            if (repo.findByEmail(user.getEmail().trim()).isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email already registered");
                return ResponseEntity.badRequest().body(error);
            }

            // ✅ NORMALIZE ROLE
            String role = user.getRole().toUpperCase();
            if (!role.equals("HR") && !role.equals("CANDIDATE")) {
                role = "CANDIDATE"; // Default to CANDIDATE
            }

            user.setEmail(user.getEmail().trim());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole(role);

            User savedUser = repo.save(user);

            // ✅ RETURN USER WITHOUT PASSWORD
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");
            response.put("user", Map.of(
                    "id", savedUser.getId(),
                    "name", savedUser.getName(),
                    "email", savedUser.getEmail(),
                    "role", savedUser.getRole()
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            // ✅ FIND USER
            User dbUser = repo.findByEmail(user.getEmail().trim())
                    .orElseThrow(() -> new RuntimeException("Invalid credentials"));

            // ✅ CHECK PASSWORD
            if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }

            // ✅ GENERATE TOKEN
            String token = jwtUtil.generateToken(dbUser);

            System.out.println("=== LOGIN SUCCESS ===");
            System.out.println("User ID: " + dbUser.getId());
            System.out.println("User Role: " + dbUser.getRole());
            System.out.println("Token: " + token.substring(0, 20) + "...");

            // ✅ RETURN RESPONSE
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of(
                    "id", dbUser.getId(),
                    "name", dbUser.getName(),
                    "email", dbUser.getEmail(),
                    "role", dbUser.getRole()  // ✅ ENSURE THIS IS "HR" OR "CANDIDATE"
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(error);
        }
    }

    // ✅ GET CURRENT USER (OPTIONAL BUT USEFUL)
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            Long userId = Long.parseLong(jwtUtil.extractClaims(token).getSubject());

            User user = repo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Map<String, Object> response = Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid token");
            return ResponseEntity.status(401).body(error);
        }
    }
}