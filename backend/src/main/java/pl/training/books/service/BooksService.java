package pl.training.books.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.training.books.model.Book;
import pl.training.books.model.ResultPage;
import pl.training.books.repository.BooksRepository;

@Service
@RequiredArgsConstructor
public class BooksService {

  @NonNull
  private BooksRepository booksRepository;

  public Book addBook(Book book) {
    booksRepository.saveAndFlush(book);
    return book;
  }

  public ResultPage<Book> getBooks(int pageNumber, int pageSize) {
    Page<Book> bookPage = booksRepository.findAll(new PageRequest(pageNumber, pageSize));
    return new ResultPage<>(bookPage.getContent(), bookPage.getNumber(), bookPage.getTotalPages());
  }

  public Book getBookById(Long id) {
    return booksRepository.getById(id)
      .orElseThrow(BookNotFoundException::new);
  }

  public void updateBook(Book book) {
    getBookById(book.getId());
    booksRepository.saveAndFlush(book);
  }

  public void delete(Long id) {
    booksRepository.delete(id);
  }

}
