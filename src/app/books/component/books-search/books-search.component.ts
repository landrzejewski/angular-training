import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {BooksService} from '../../service/books.service';
import {Observable} from 'rxjs';
import {BookModel} from '../../model/book.model';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, filter, map} from "rxjs/operators";

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
      .pipe(filter((text) => text.length > 3))
      .pipe(map((text) => text.toLowerCase()))
      .subscribe((text) => this.search.emit(this.booksService.search('title', text)));
  }

  /*searchBooks(value: string) {
    const result: Observable<BookModel[]> = this.booksService.search('title', value);
    this.search.emit(result);
  }*/

}
