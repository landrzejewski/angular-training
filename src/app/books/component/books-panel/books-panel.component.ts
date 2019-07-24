import {Component, Inject} from '@angular/core';
import {BookModel} from '../../model/book.model';
import {Observable, Subscription} from "rxjs";
import {BooksService} from '../../service/books.service';

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

  constructor(@Inject('BooksService') private booksService: BooksService) {
    this.refresh();
  }

  select(book) {
    this.selectedBook = book;
    this.editedBook = {...book};
  }

  isSelected(book): boolean {
    return book === this.selectedBook;
  }

  add($event) {
    $event.preventDefault();
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

  remove($event) {
    $event.preventDefault();
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
      ()=> (exception) => this.onException(exception),
      () => this.refresh()
    );
  }

  private refresh() {
    this.refreshBooks(this.booksService.getAll());
  }

  private refreshBooks(observable: Observable<BookModel[]>) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.isProcessing = true;
    this.subscription = observable.subscribe(
      (books) => this.books = books,
      (exception) => this.onException(exception),
      () => this.isProcessing = false
    );
  }

  private onException(exception) {
    console.log(exception);
    this.isProcessing = false;
  }

}
