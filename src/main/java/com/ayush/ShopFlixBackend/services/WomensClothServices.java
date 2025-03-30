package com.ayush.ShopFlixBackend.services;


import com.ayush.ShopFlixBackend.Repo.WomensClothRepo;
import com.ayush.ShopFlixBackend.entity.WomensCloth;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WomensClothServices {

    private final WomensClothRepo repo;

    public WomensClothServices(WomensClothRepo repo) {
        this.repo = repo;
    }

    public List<WomensCloth> getWomensClothesByIds(List<Long> ids) {
        return repo.findAllById(ids);
    }

    public Page<WomensCloth> getWomensClothes(Pageable pageable) {
        return repo.findAll(pageable);
    }
}
