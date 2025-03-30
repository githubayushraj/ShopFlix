package com.ayush.ShopFlixBackend.services;

import com.ayush.ShopFlixBackend.Repo.SearchProductRepo;
import com.ayush.ShopFlixBackend.entity.ProductSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;

@Service
public class SearchProductServices {

    private final SearchProductRepo searchProductRepo;

    public SearchProductServices(SearchProductRepo searchProductRepo) {
        this.searchProductRepo = searchProductRepo;
    }

    // Supports pagination: page (zero-based) and size (number of items per page)
    public List<ProductSearch> searchAll(String query, int page, int size) {
        System.out.println("Searching Elasticsearch for: " + query + " | page: " + page + ", size: " + size);
        try {
            // Create a PageRequest for pagination
            PageRequest pageRequest = PageRequest.of(page, size);

            // Perform a search with partial matching on productName
            Page<ProductSearch> resultsPage = searchProductRepo.findByProductNameContaining(query, pageRequest);
            System.out.println("Elasticsearch returned: " + resultsPage.getTotalElements() + " total results; " + resultsPage.getContent().size() + " in current page.");

            return resultsPage.getContent();
        } catch (Exception e) {
            System.out.println("Error in searchAll: " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
