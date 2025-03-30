package com.ayush.ShopFlixBackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "electronics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Electronics {

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
