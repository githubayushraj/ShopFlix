package com.ayush.ShopFlixBackend.controller;

import com.ayush.ShopFlixBackend.entity.Electronics;
import com.ayush.ShopFlixBackend.entity.UserItems;
import com.ayush.ShopFlixBackend.services.UserItemService;
import com.ayush.ShopFlixBackend.services.electronicServices;
import com.ayush.ShopFlixBackend.services.movieServices;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user_items")
public class UserItemController {

    private final UserItemService service;
    private final electronicServices electronicServicesService;
    private final movieServices moviesServicesService;

    public UserItemController(UserItemService service, electronicServices electronicServicesService, movieServices moviesServicesService) {
        this.service = service;
        this.electronicServicesService = electronicServicesService;
        this.moviesServicesService = moviesServicesService;
    }

    @PostMapping("/add")
    public String addItem(@RequestParam Long user_id,
                          @RequestParam Long item_id,
                          @RequestParam String category,
                          @RequestParam(required = false) String section) {
        service.addItemToUser(user_id, item_id, category, section);
        return "Item added Successfully...";
    }


    @GetMapping("/cart/count/{userId}")
    public Map<String, Integer> getCartCount(@PathVariable Long userId) {
        int count = service.getUserItems(userId, "CART").size();
        Map<String, Integer> response = new HashMap<>();
        response.put("count", count);
        return response;
    }


    @GetMapping("/cart/{userId}")
    public List<UserItems> getCartItem(@PathVariable long userId) {
        return service.getUserItems(userId, "CART");
    }


    @GetMapping("/cart/items/{userId}")
    public Map<String, List<?>> getCartItemsBySection(@PathVariable Long userId) {
        // Step 1: Get the grouped item IDs from the CART category.
        Map<String, List<Long>> groupedItems = service.getUserItemsGroupedBySection_Cart(userId);
        Map<String, List<?>> cartItems = new HashMap<>();

        // Step 2: For each section, call the corresponding service to retrieve full details.
        groupedItems.forEach((section, itemIds) -> {
            switch (section.toLowerCase()) {
                case "electronics":
                    cartItems.put("electronics", electronicServicesService.getElectronicsByIds(itemIds));
                    break;
                // Uncomment and implement additional sections as needed:
                // case "movies":
                //     cartItems.put("movies", movieService.getMoviesByIds(itemIds));
                //     break;
                // case "mens_cloth":
                //     cartItems.put("mens_cloth", mensClothService.getMensClothByIds(itemIds));
                //     break;
                // case "girls_cloth":
                //     cartItems.put("girls_cloth", girlsClothService.getGirlsClothByIds(itemIds));
                //     break;
                // case "kids_section":
                //     cartItems.put("kids_section", kidsSectionService.getKidsClothByIds(itemIds));
                //     break;
                default:
                    System.out.println("Unknown section: " + section);
            }
        });
        return cartItems;
    }


    @GetMapping("/watchlater/items/{userId}")
    public Map<String, List<?>> getWatchlaterItemsBySection(@PathVariable Long userId) {
        Map<String, List<Long>> groupedItems = service.getUserItemsGroupedBySection_Watchlater(userId);
        Map<String, List<?>> cartItems = new HashMap<>();

        groupedItems.forEach((section, itemIds) -> {
            switch (section.toLowerCase()) {
                case "movies":
                    cartItems.put("movies", moviesServicesService.getMoviebyId(itemIds));
                    break;
                default:
                    System.out.println("Unknown section: " + section);
            }
        });
        return cartItems;
    }

}
