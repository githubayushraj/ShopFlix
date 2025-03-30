package com.ayush.ShopFlixBackend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import lombok.*;

@Document(indexName = "shop_products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductSearch {

    @Id
    private String id;

    @Field(name = "product_name", type = FieldType.Text) // Maps "product_name" to productName
    private String productName;

    @Field(type = FieldType.Text)
    private String description;

    @Field(name = "actual_price", type = FieldType.Double) // Maps "actual_price" to actualPrice
    private double actualPrice;

    @Field(name = "discount_price", type = FieldType.Double) // Maps "discount_price" to discountPrice
    private double discountPrice;

    @Field(type = FieldType.Text)
    private String image;

    @Field(type = FieldType.Text)
    private String link;

    @Field(name = "main_category", type = FieldType.Text)
    private String mainCategory;

    @Field(name = "sub_category", type = FieldType.Text)
    private String subCategory;

    @Field(type = FieldType.Double)
    private double ratings;

    @Field(name = "no_of_ratings", type = FieldType.Integer)
    private int noOfRatings;

    @Field(type = FieldType.Text)
    private String type; // e.g., "Electronics", "Beauty & Grooming", etc.
}
