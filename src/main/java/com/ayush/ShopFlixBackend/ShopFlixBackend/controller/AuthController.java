package com.ayush.ShopFlixBackend.controller;

import com.ayush.ShopFlixBackend.entity.Users;
import com.ayush.ShopFlixBackend.model.AuthenticationRequest;
import com.ayush.ShopFlixBackend.model.AuthenticationResponse;
import com.ayush.ShopFlixBackend.security.JwtHelper;
import com.ayush.ShopFlixBackend.services.usersServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;



@RestController  // Marks this class as a REST controller that handles HTTP requests.
@RequestMapping("/auth")  // Base URL for all authentication-related endpoints.
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;  // Service to load user details from the database.

    @Autowired
    private AuthenticationManager authenticationManager;  // Manages authentication using Spring Security.

    @Autowired
    private JwtHelper jwtHelper;  // Helper class for generating and validating JWT tokens.

    @Autowired
    private usersServices services;  // Service class to handle user-related operations like saving new users.

    private final Logger logger = LoggerFactory.getLogger(AuthController.class);  // Logger to track authentication events.

    @PostMapping("/login")  // Endpoint for user login.
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        try {
            // Authenticate the user using email and password.
            doAuthenticate(request.getEmail(), request.getPassword());

            // Load user details from the database based on email.
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

            // Generate a JWT token for the authenticated user.
            String token = jwtHelper.generateToken(userDetails);

            // Build the authentication response containing the token and username.
            AuthenticationResponse response = AuthenticationResponse.builder()
                    .jwtToken(token)
                    .username(userDetails.getUsername())
                    .build();

            // Return a successful response with the generated token.
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BadCredentialsException ex) {
            // Log an error message for invalid credentials.
            logger.error("Invalid credentials for email: {}", request.getEmail());

            // Return an unauthorized response if credentials are incorrect.
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/signup")  // Endpoint for user registration.
    public ResponseEntity<Users> usersCreate(@RequestBody Users user) {
        // Save the new user to the database.
        Users savedUser = services.saveUser(user);

        // Return a response with the created user and HTTP 201 status.
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    private void doAuthenticate(String email, String password) {
        // Create an authentication token with email and password.
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(email, password);

        // Authenticate the user using the authentication manager.
        authenticationManager.authenticate(authenticationToken);
    }

    @ExceptionHandler(BadCredentialsException.class)  // Handle authentication failures.
    public ResponseEntity<String> handleBadCredentials(BadCredentialsException ex) {
        // Return an error message when credentials are invalid.
        return new ResponseEntity<>("Credentials Invalid !!", HttpStatus.UNAUTHORIZED);
    }
}
