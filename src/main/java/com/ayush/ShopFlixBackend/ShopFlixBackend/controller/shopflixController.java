package com.ayush.ShopFlixBackend.controller;

import com.ayush.ShopFlixBackend.entity.Electronics;
import com.ayush.ShopFlixBackend.entity.Movie;
import com.ayush.ShopFlixBackend.services.electronicServices;
import com.ayush.ShopFlixBackend.services.movieServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shopflix")
public class shopflixController {


    //  Movies....
    private final movieServices MoviesServices;
    private final electronicServices ElectronicServices;


    public shopflixController(movieServices MoviesServices, electronicServices electronicServices) {
        this.MoviesServices = MoviesServices;
        ElectronicServices = electronicServices;
    }

    // Fetch movies with token validation
    @GetMapping("/movies")
    public Page<Movie> getMovies(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "21") int size) {
        return MoviesServices.getMovies(PageRequest.of(page,size));
    }

    // Electronics...
    @GetMapping("/electronics")
    public Page<Electronics> getElectronics(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "20") int size) {
        return ElectronicServices.getElectronics(PageRequest.of(page, size));
    }



    @GetMapping("/fashion")
    public Page<Electronics> get(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "20") int size) {
        return ElectronicServices.getElectronics(PageRequest.of(page, size));
    }

}
