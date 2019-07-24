import {Inject, Injectable, Optional} from '@angular/core';
import {BookModel} from '../model/book.model';
import {BooksService} from './books.service';
import {EMPTY, Observable, of} from 'rxjs';

@Injectable()
export class ArrayBooksService implements BooksService {

  constructor(@Inject('BooksData') @Optional() private readonly books: BookModel[]) {
    if (!books) {
      this.books = [];
    }
  }

  getAll(): Observable<BookModel[]> {
    return of([...this.books]);
  }

  save(book: BookModel): Observable<BookModel> {
    book.id = Date.now();
    this.books.push(book);
    return of(book);
  }

  update(book: BookModel): Observable<void> {
    const index = this.findIndex(book.id);
    if (index !== -1) {
      this.books[index] = book;
    }
    return EMPTY;
  }

  remove(bookId: number): Observable<void>  {
    const index = this.findIndex(bookId);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
    return EMPTY;
  }

  private findIndex(bookId: number): number {
    return this.books.findIndex((currentBook) => bookId === currentBook.id);
  }

  search(property: string, query: string): Observable<BookModel[]> {
    throw new Error("Not yet implemented")
  }

  getById(bookId: number): Observable<BookModel> {
    throw new Error("Not yet implemented")
  }

}
