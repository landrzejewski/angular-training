import {Component, Input} from '@angular/core';
import {BookModel} from '../../model/book.model';

@Component({
  selector: 'app-books-panel',
  templateUrl: './books-panel.component.html',
  styleUrls: ['./books-panel.component.scss']
})
export class BooksPanelComponent {

  @Input()
  books: BookModel[] = [];
  selectedBook = null;
  editedBook = null;

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
      Object.assign(this.selectedBook, book);
    } else {
      book.id = Date.now();
      this.books.push(book);
    }
    this.reset();
  }

  remove() {
    const index = this.findIndex(this.editedBook);
    if (index != -1) {
      this.books.splice(index, 1);
    }
    this.reset();
  }

  reset() {
    this.selectedBook = null;
    this.editedBook = null;
  }

  private findIndex(book: BookModel): number {
    return this.books.findIndex((currentBook) => book.id === currentBook.id);
  }

}
