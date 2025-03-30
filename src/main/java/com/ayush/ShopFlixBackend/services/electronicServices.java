package com.ayush.ShopFlixBackend.services;

import com.ayush.ShopFlixBackend.Repo.electronictRepo;
import com.ayush.ShopFlixBackend.entity.Electronics;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class electronicServices {

    private final electronictRepo repo;

    public electronicServices(electronictRepo repo)
    {
        this.repo = repo;
    }

    @Transactional
    public Electronics saveProduct(Electronics product) {
        return repo.save(product);
    }

    public Page<Electronics> getElectronics(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Transactional
    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }

    public Optional<Electronics> getProductById(Long id){
        return repo.findById(id);
    }

    public List<Electronics> getElectronicsByIds(List<Long> ids) {
        return repo.findAllById(ids);
    }


}
