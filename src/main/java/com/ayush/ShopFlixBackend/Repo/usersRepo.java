package com.ayush.ShopFlixBackend.Repo;

import com.ayush.ShopFlixBackend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface usersRepo extends JpaRepository<Users,Integer> {

    Users findByEmail(String email); // custom
}
