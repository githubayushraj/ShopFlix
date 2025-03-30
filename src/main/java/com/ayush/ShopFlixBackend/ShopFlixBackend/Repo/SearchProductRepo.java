package com.ayush.ShopFlixBackend.Repo;

import com.ayush.ShopFlixBackend.entity.ProductSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SearchProductRepo extends ElasticsearchRepository<ProductSearch, String> {

    // Custom wildcard query using product_name.keyword.
    // This method performs a wildcard search on the exact (keyword) version of product_name.
    @Query("{\"wildcard\": {\"product_name.keyword\": {\"value\": \"*?0*\"}}}")
    List<ProductSearch> findByProductNameCustom(String query);

    Page<ProductSearch> findByProductNameContaining(String query, Pageable pageable);

    // Derived query method for partial matching on productName.
    List<ProductSearch> findByProductNameContaining(String query);

    // Derived query methods for filtering by categories.
    List<ProductSearch> findByMainCategoryContaining(String mainCategory);
    List<ProductSearch> findBySubCategoryContaining(String subCategory);
    List<ProductSearch> findByMainCategoryContainingOrSubCategoryContaining(String mainCategory, String subCategory);

    // Derived query for an exact match on productName (if needed).
    List<ProductSearch> findByProductName(String query);
}
