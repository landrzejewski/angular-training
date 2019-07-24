import {Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {BookModel} from '../../model/book.model';
import {BooksService} from '../../service/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {

  books: Observable<BookModel[]>;

  constructor(@Inject('BooksService') private booksService: BooksService) {
    this.books = this.booksService.getAll();
  }

}
