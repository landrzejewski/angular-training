import {Inject, Injectable, Optional} from '@angular/core';
import {BookModel} from "../model/book.model";

@Injectable({
  providedIn: 'root'
})
export class ArrayBooksService {

  constructor(@Inject('BooksData') @Optional() private readonly books: BookModel[]) {
    if (!books) {
      this.books = [];
    }
  }

  getAll(): BookModel[] {
    return [...this.books];
  }

  save(book: BookModel): BookModel {
    book.id = Date.now();
    this.books.push(book);
    return book;
  }

  update(book: BookModel) {
    const index = this.findIndex(book.id);
    if (index !== -1) {
      this.books[index] = book;
    }
  }

  remove(bookId: number) {
    const index = this.findIndex(bookId);
    if (index !== -1) {
      this.books.splice(index);
    }
  }

  private findIndex(bookId: number): number {
    return this.books.findIndex((currentBook) => bookId === currentBook.id);
  }

}
