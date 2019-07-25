package pl.training.books.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.training.books.model.Book;

import java.util.Optional;

public interface BooksRepository extends JpaRepository<Book, Long> {

    Optional<Book> getById(Long id);

}
