import {Component} from '@angular/core';
import {BookModel} from './books/model/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  books: BookModel[] = [];

  constructor() {
    const book = new BookModel();
    book.id = 1;
    book.title = 'Angular in action';
    book.authors = 'Jan Kowalski';
    book.category = '#ffbe3c';
    book.bestseller = true;
    book.rating = 3;
    this.books.push(book);
  }

}
