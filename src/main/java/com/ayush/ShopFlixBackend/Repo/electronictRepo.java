package com.ayush.ShopFlixBackend.Repo;

import com.ayush.ShopFlixBackend.entity.Electronics;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

@Repository
public interface electronictRepo extends JpaRepository<Electronics,Long> {

}
