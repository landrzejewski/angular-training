import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {BooksService} from '../../service/books.service';
import {Observable} from 'rxjs';
import {BookModel} from '../../model/book.model';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss']
})
export class BooksSearchComponent {

  @Output()
  search = new EventEmitter();

  constructor(@Inject('BooksService') private booksService: BooksService) {
  }

  searchBooks(value: string) {
    const result: Observable<BookModel[]> = this.booksService.search('title', value);
    this.search.emit(result);
  }

}
