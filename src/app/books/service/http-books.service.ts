import {Injectable} from '@angular/core';
import {BooksService} from './books.service';
import {Observable} from 'rxjs';
import {BookModel} from '../model/book.model';
import {HttpClient} from '@angular/common/http';
import {Api} from '../../api';

@Injectable()
export class HttpBooksService implements BooksService {

  constructor(private httpClient: HttpClient, private api: Api) {
  }

  getById(bookId: number): Observable<BookModel> {
    return this.httpClient.get<BookModel>(`${this.api.books}/${bookId}`);
  }

  getAll(): Observable<BookModel[]> {
    return this.httpClient.get<BookModel[]>(this.api.books);
  }

  save(book: BookModel): Observable<BookModel> {
    return this.httpClient.post<BookModel>(this.api.books, book);
  }

  update(book: BookModel): Observable<void> {
    return this.httpClient.put<void>(`${this.api.books}/${book.id}`, book);
  }

  search(property: string, query: string): Observable<BookModel[]> {
    return this.httpClient.get<BookModel[]>(`${this.api.books}?${property}_like=${query}`);
  }

  remove(bookId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.api.books}/${bookId}`);
  }

}
