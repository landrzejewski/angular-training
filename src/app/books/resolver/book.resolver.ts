import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BookModel} from '../model/book.model';
import {Observable} from 'rxjs';
import {Inject} from '@angular/core';
import {BooksService} from '../service/books.service';

export class BookResolver implements Resolve<BookModel> {

  constructor(@Inject('BooksService') private booksService: BooksService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookModel> {
    return undefined;
  }

}
