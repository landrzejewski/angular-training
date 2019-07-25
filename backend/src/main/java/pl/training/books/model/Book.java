package pl.training.books.model;

import lombok.Data;

import javax.persistence.*;

@Table(name = "books")
@Entity
@Data
public class Book {

    @GeneratedValue
    @Id
    private Long id;
    private String title;
    private String authors;
    private String category;
    private boolean bestseller;
    private int rating;
    @Enumerated(EnumType.STRING)
    private Genre genre;

}
