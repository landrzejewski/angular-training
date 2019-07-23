import {Observable} from 'rxjs';
import {BookModel} from '../model/book.model';

export interface BooksService {

  getAll(): Observable<BookModel[]>;

  save(book: BookModel): Observable<BookModel>;

  update(book: BookModel): Observable<void>;

  remove(bookId: number): Observable<void>;

  search(property: string, query: string): Observable<BookModel[]>;

}
