package com.ayush.ShopFlixBackend.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "movies_index")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieSearch {

    @Id
    private String id; // Use String for Elasticsearch ids

    private String seriesTitle;
    private Integer releasedYear;
    private String certificate;
    private String runtime;
    private String genre;
    private Double imdbRating;
    private String overview;
    private Integer metaScore;
    private String director;
    private String posterLink;
}
