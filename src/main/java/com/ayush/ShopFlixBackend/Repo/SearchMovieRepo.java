package com.ayush.ShopFlixBackend.Repo;

import com.ayush.ShopFlixBackend.entity.MovieSearch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface SearchMovieRepo extends ElasticsearchRepository<MovieSearch, String> {
    List<MovieSearch> findBySeriesTitleContaining(String query);
    // You can add more custom methods if needed
}
