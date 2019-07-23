import {Component} from '@angular/core';
import {BookModel} from '../../model/book.model';
import {ArrayBooksService} from "../../service/array-books.service";

@Component({
  selector: 'app-books-panel',
  templateUrl: './books-panel.component.html',
  styleUrls: ['./books-panel.component.scss']
})
export class BooksPanelComponent {

  books: BookModel[] = [];
  selectedBook = null;
  editedBook = null;

  constructor(private booksService: ArrayBooksService) {
    this.refresh();
  }

  refresh() {
    this.books = this.booksService.getAll();
  }

  select(book) {
    this.selectedBook = book;
    this.editedBook = {...book};
  }

  isSelected(book): boolean {
    return book === this.selectedBook;
  }

  add() {
    this.editedBook = new BookModel();
  }

  save(book: BookModel) {
    if (book.id) {
      this.booksService.update(book);
    } else {
      this.booksService.save(book);
    }
    this.reset();
    this.refresh();
  }

  remove() {
    this.booksService.remove(this.editedBook.id);
    this.reset();
    this.refresh();
  }

  reset() {
    this.selectedBook = null;
    this.editedBook = null;
  }

}
