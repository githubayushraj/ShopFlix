package com.ayush.ShopFlixBackend.services;



import com.ayush.ShopFlixBackend.Repo.KitchenStorageRepo;
import com.ayush.ShopFlixBackend.entity.KitchenStorage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KitchenStorageServices {

    private final KitchenStorageRepo repo;

    public KitchenStorageServices(KitchenStorageRepo repo) {
        this.repo = repo;
    }

    public Page<KitchenStorage> getKitchenStorage(Pageable pageable){
        return repo.findAll(pageable);
    }

    public Optional<KitchenStorage> getKitchen (Long id){
        return repo.findById(id);
    }

    public List<KitchenStorage> getKitchenStorageByIds(List<Long> ids){
        return repo.findAllById(ids);
    }

}
