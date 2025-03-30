package com.ayush.ShopFlixBackend.Repo;

import com.ayush.ShopFlixBackend.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface movieRepo extends JpaRepository<Movie,Long> {

}
