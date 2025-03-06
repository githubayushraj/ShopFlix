package com.ayush.ShopFlixBackend.services;

import com.ayush.ShopFlixBackend.Repo.UserItemRepo;
import com.ayush.ShopFlixBackend.entity.UserItems;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserItemService {

    private final UserItemRepo userItemRepo;

    public UserItemService(UserItemRepo userItemRepo) {
        this.userItemRepo = userItemRepo;
    }

    public void addItemToUser(Long userId, Long itemId, String category, String section) {
        UserItems userItems = new UserItems();
        userItems.setUserId(userId);
        userItems.setItemId(itemId);

        // Convert category from String to Enum (handle invalid cases)
        try {
            userItems.setCategory(UserItems.Category.valueOf(category.toUpperCase())); // ✅ Fixed
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid category: " + category); // Custom exception can be used
        }

        userItems.setSection(section);
        userItemRepo.save(userItems);
    }

    public List<UserItems> getUserItems(Long userId, String category) {
        try {
            UserItems.Category categoryEnum = UserItems.Category.valueOf(category.toUpperCase()); // ✅ Fixed
            return userItemRepo.findByUserIdAndCategory(userId, categoryEnum);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid category: " + category);
        }
    }

    public Map<String, List<Long>> getUserItemsGroupedBySection_Cart(Long userId) {
        List<UserItems> userItems = userItemRepo.findByUserIdAndCategory(userId, UserItems.Category.CART);
        return userItems.stream()
                .collect(Collectors.groupingBy(
                        UserItems::getSection,
                        Collectors.mapping(UserItems::getItemId, Collectors.toList())
                ));
    }

    public Map<String, List<Long>> getUserItemsGroupedBySection_Watchlater(Long userId) {
        List<UserItems> userItems = userItemRepo.findByUserIdAndCategory(userId, UserItems.Category.WATCHLATER);
        return userItems.stream()
                .collect(Collectors.groupingBy(
                        UserItems::getSection,
                        Collectors.mapping(UserItems::getItemId, Collectors.toList())
                ));
    }



}
