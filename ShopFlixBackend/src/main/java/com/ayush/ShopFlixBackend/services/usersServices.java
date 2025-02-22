package com.ayush.ShopFlixBackend.services;

import com.ayush.ShopFlixBackend.Repo.usersRepo;
import com.ayush.ShopFlixBackend.entity.Users;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class usersServices {

    private final usersRepo repo;
    private final PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    public usersServices(usersRepo repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public Users saveUser(Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
        return repo.save(user);
    }
}
