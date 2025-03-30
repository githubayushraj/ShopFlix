package com.ayush.ShopFlixBackend.services;


import com.ayush.ShopFlixBackend.Repo.movieRepo;
import com.ayush.ShopFlixBackend.entity.Electronics;
import com.ayush.ShopFlixBackend.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class movieServices {

    private final movieRepo repo;

    public movieServices(movieRepo repo) {
        this.repo = repo;
    }


    public List<Movie> getMoviebyId(List<Long> ids){
        return repo.findAllById(ids);
    }



    public Page<Movie> getMovies(Pageable Pageable){
        return repo.findAll(Pageable);
    }

}
