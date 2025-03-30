package com.ayush.ShopFlixBackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "womens_cloth")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WomensCloth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "main_category", nullable = false)
    private String mainCategory;

    @Column(name = "sub_category", nullable = false)
    private String subCategory;

    private String image;

    @Column(name = "link", length = 1000)  // Updated column size
    private String link;

    private Double ratings;

    @Column(name = "no_of_rating")
    private Integer noOfRatings;

    @Column(name = "discount_price", nullable = false)
    private Double discountPrice;

    @Column(name = "actual_price", nullable = false)
    private Double actualPrice;
}
