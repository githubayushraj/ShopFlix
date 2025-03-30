package com.ayush.ShopFlixBackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String posterLink;

    @Column(nullable = false)
    private String seriesTitle;

    @Column(nullable = false)
    private Integer releasedYear;

    @Column(length = 10)
    private String certificate;

    @Column(nullable = false)
    private String runtime;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private Double imdbRating;

    @Column(columnDefinition = "TEXT")
    private String overview;

    private Integer metaScore;

    @Column(nullable = false)
    private String director;
}
