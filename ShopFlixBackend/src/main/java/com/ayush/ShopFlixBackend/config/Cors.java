package com.ayush.ShopFlixBackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Cors implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Adjust as needed
                .allowedOrigins("http://localhost:5173") // Removed extra space
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed methods
                .allowCredentials(true);
    }
}
