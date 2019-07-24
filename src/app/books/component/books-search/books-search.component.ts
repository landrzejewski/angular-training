import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {BooksService} from '../../service/books.service';
import {Observable, zip} from 'rxjs';
import {BookModel} from '../../model/book.model';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinct, filter, flatMap, map, toArray} from "rxjs/operators";

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss']
})
export class BooksSearchComponent {

  searchForm = new FormGroup({
    'search': new FormControl()
  });

  @Output()
  search = new EventEmitter();

  constructor(@Inject('BooksService') private booksService: BooksService) {
    this.searchForm.get('search').valueChanges
      .pipe(debounceTime(500))
    //  .pipe(filter((text) => text.length > 3))
      .pipe(map((text) => text.toLowerCase()))
      .subscribe((text) => this.searchBooks(text));
  }

  private searchBooks(text: string) {
    const firstQuery = this.booksService.search('title', text);
    const secondQuery = this.booksService.search('authors', text);
    const results = zip(firstQuery, secondQuery)
      .pipe(map((results) => results[0].concat(results[1])))
      .pipe(flatMap((books) => books))
      .pipe(distinct((book) => book.id))
      .pipe(toArray());
    this.search.emit(results);
  }

  /*searchBooks(value: string) {
    const result: Observable<BookModel[]> = this.booksService.search('title', value);
    this.search.emit(result);
  }*/

}
