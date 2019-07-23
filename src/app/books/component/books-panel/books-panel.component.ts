import {Component} from '@angular/core';
import {BookModel} from '../../model/book.model';
import {ArrayBooksService} from "../../service/array-books.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-books-panel',
  templateUrl: './books-panel.component.html',
  styleUrls: ['./books-panel.component.scss']
})
export class BooksPanelComponent {

  books: BookModel[] = [];
  selectedBook = null;
  editedBook = null;
  isProcessing = false;
  subscription: Subscription;

  constructor(private booksService: ArrayBooksService) {
    this.refresh();
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
      this.processAsync(this.booksService.update(book));
    } else {
      this.processAsync(this.booksService.save(book));
    }
    this.reset();
  }

  remove() {
    this.processAsync(this.booksService.remove(this.editedBook.id));
    this.reset();
  }

  reset() {
    this.selectedBook = null;
    this.editedBook = null;
  }

  private processAsync(observable: Observable<any>) {
    this.isProcessing = true;
    observable.subscribe(
      () => {},
      ()=> (exception) => {console.log(exception); this.isProcessing = false;},
      () => this.refresh()
    );
  }

  private refresh() {
    this.isProcessing = true;
    this.refreshBooks(this.booksService.getAll());
  }

  private refreshBooks(observable: Observable<BookModel[]>) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = observable.subscribe(
      (books) => this.books = books,
      (exception) => {console.log(exception); this.isProcessing = false;},
      () => this.isProcessing = false
    );
  }

}
