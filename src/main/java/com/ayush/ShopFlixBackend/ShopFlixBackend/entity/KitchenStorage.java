package com.ayush.ShopFlixBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Table(name = "kitchen_storage")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KitchenStorage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "main_category", nullable = false)
    private String mainCategory;

    @Column(name = "sub_category", nullable = false)
    private String subCategory;

    @Column(nullable = false, length = 500)
    private String image;

    @Column(nullable = false, length = 500)
    private String link;

    private Double ratings;

    @Column(name = "no_of_ratings")
    private Integer noOfRatings;

    @Column(name = "discount_price", nullable = false)
    private Double discountPrice;

    @Column(name = "actual_price", nullable = false)
    private Double actualPrice;
}
