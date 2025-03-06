package com.ayush.ShopFlixBackend.Repo;

import com.ayush.ShopFlixBackend.entity.UserItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserItemRepo extends JpaRepository<UserItems, Long> {

    // ✅ Fixed: Corrected method signature
    List<UserItems> findByUserIdAndCategory(Long userId, UserItems.Category category);
}
