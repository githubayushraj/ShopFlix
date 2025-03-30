package com.ayush.ShopFlixBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EnableJpaRepositories
public class ShopFlixBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopFlixBackendApplication.class, args);
	}

}
