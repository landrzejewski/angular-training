package pl.training.books.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.training.books.dto.BookDto;
import pl.training.books.dto.PageDto;
import pl.training.books.mapper.Mapper;
import pl.training.books.model.Book;
import pl.training.books.model.ResultPage;
import pl.training.books.service.BooksService;
import pl.training.books.web.UriBuilder;

import java.net.URI;
import java.util.List;

import static org.springframework.http.ResponseEntity.noContent;

@RequestMapping(value = "api/v1/books")
@RestController
@RequiredArgsConstructor
public class BooksController {

  @NonNull
  private BooksService booksService;
  @NonNull
  private Mapper mapper;
  private UriBuilder uriBuilder = new UriBuilder();

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity addBook(@RequestBody BookDto bookDto) {
    Book book = booksService.addBook(mapper.map(bookDto, Book.class));
    URI uri = uriBuilder.requestUriWithId(book.getId());
    return ResponseEntity.created(uri).body(book);
  }

  @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
  public ResponseEntity deleteById(@PathVariable Long id) {
    booksService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @RequestMapping(method = RequestMethod.GET)
  public PageDto<BookDto> getBooks(
    @RequestParam(required = false, defaultValue = "0", name = "pageNumber") int pageNumber,
    @RequestParam(required = false, defaultValue = "10", name = "pageSize") int pageSize) {
    ResultPage<Book> resultPage = booksService.getBooks(pageNumber, pageSize);
    List<BookDto> booksDtos = mapper.map(resultPage.getData(), BookDto.class);
    return new PageDto<>(booksDtos, resultPage.getPageNumber(), resultPage.getTotalPages());
  }

  @RequestMapping(value = "{id}", method = RequestMethod.GET)
  public BookDto getBookById(@PathVariable Long id) {
    Book book = booksService.getBookById(id);
    return mapper.map(book, BookDto.class);
  }

  @RequestMapping(value = "{id}", method = RequestMethod.PUT)
  public ResponseEntity updateBook(@RequestBody BookDto bookDto, @PathVariable Long id) {
    Book book = mapper.map(bookDto, Book.class);
    book.setId(id);
    booksService.updateBook(book);
    return noContent().build();
  }

}
