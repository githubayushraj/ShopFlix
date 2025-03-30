package com.ayush.ShopFlixBackend.security;

import com.ayush.ShopFlixBackend.Repo.usersRepo;
import com.ayush.ShopFlixBackend.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private usersRepo repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = repo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        // Wrap the user entity in a CustomUserDetails object (which implements UserDetails)
        return new CustomUserDetails(user);
    }
}
