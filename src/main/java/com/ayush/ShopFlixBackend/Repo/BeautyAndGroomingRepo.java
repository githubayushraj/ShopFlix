package com.ayush.ShopFlixBackend.Repo;


import com.ayush.ShopFlixBackend.entity.BeautyAndGrooming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BeautyAndGroomingRepo extends JpaRepository<BeautyAndGrooming,Long> {

}
