package com.ayush.ShopFlixBackend.controller;

import com.ayush.ShopFlixBackend.entity.MovieSearch;
import com.ayush.ShopFlixBackend.services.SearchMoviesServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from your frontend
@RestController
@RequestMapping("/api/movies/search")
public class MoviesSearchController {

    private final SearchMoviesServices searchMoviesServices;

    public MoviesSearchController(SearchMoviesServices searchMoviesServices) {
        this.searchMoviesServices = searchMoviesServices;
    }

    @GetMapping
    public ResponseEntity<?> searchMovies(@RequestParam("query") String query) {
        List<MovieSearch> results = searchMoviesServices.searchMovies(query);
        if (results.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No movies found for query: " + query);
        }
        return ResponseEntity.ok(results);
    }
}
