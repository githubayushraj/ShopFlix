package com.ayush.ShopFlixBackend.services;

import com.ayush.ShopFlixBackend.Repo.SearchMovieRepo;
import com.ayush.ShopFlixBackend.entity.MovieSearch;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SearchMoviesServices {

    private final SearchMovieRepo movieSearchRepo;

    public SearchMoviesServices(SearchMovieRepo movieSearchRepo) {
        this.movieSearchRepo = movieSearchRepo;
    }

    public List<MovieSearch> searchMovies(String query) {
        return movieSearchRepo.findBySeriesTitleContaining(query);
    }
}
