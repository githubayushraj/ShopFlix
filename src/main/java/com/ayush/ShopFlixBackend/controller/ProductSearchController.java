package com.ayush.ShopFlixBackend.controller;

import com.ayush.ShopFlixBackend.entity.ProductSearch;
import com.ayush.ShopFlixBackend.services.SearchProductServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/search")
public class ProductSearchController {

    private final SearchProductServices productSearchService;

    public ProductSearchController(SearchProductServices productSearchService) {
        this.productSearchService = productSearchService;
    }

    @GetMapping
    public ResponseEntity<?> searchProducts(@RequestParam("query") String query,
                                            @RequestParam("page") int page,
                                            @RequestParam("size") int size) {
        try {
            System.out.println("Received search query: " + query + " | page: " + page + ", size: " + size);
            List<ProductSearch> results = productSearchService.searchAll(query, page, size);
            System.out.println("Search results size: " + results.size());

            if (results.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No products found for query: " + query);
            }
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            System.err.println("Search error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Search error: " + e.getMessage());
        }
    }
}
