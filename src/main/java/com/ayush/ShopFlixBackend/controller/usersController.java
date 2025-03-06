package com.ayush.ShopFlixBackend.controller;


import com.ayush.ShopFlixBackend.entity.Users;
import com.ayush.ShopFlixBackend.services.usersServices;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class usersController {


    private final usersServices services;

    public usersController(usersServices services) {
        this.services = services;
    }


    @GetMapping("/{email}")
    public Users getUserProfile(@PathVariable String email) {
        return services.getUserProfile(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


}
