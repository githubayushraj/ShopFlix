package com.ayush.ShopFlixBackend.services;


import com.ayush.ShopFlixBackend.Repo.BeautyAndGroomingRepo;
import com.ayush.ShopFlixBackend.entity.BeautyAndGrooming;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class beautyAndGroomingServices {

    private final BeautyAndGroomingRepo repo;


    public beautyAndGroomingServices(BeautyAndGroomingRepo repo) {
        this.repo = repo;
    }

    public List<BeautyAndGrooming> getBeautyAndGroomingByIds(List<Long> ids){
        return repo.findAllById(ids);
    }

    public Page<BeautyAndGrooming> getBeautyAndGrooming(Pageable pageable) {
        return repo.findAll(pageable);
    }
}
