package pl.training.books.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.training.books.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> getByUsername(String username);

}
