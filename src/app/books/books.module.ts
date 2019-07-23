import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookCardComponent} from './component/book-card/book-card.component';
import {BookFormComponent} from './component/book-form/book-form.component';
import {FormsModule} from '@angular/forms';
import {BooksPanelComponent} from './component/books-panel/books-panel.component';
import {SharedModule} from '../shared/shared.module';
import booksData from '../books/model/books.data';
import {HttpClientModule} from '@angular/common/http';
import {HttpBooksService} from "./service/http-books.service";

@NgModule({
  declarations: [
    BookCardComponent,
    BookFormComponent,
    BooksPanelComponent
  ],
  exports: [
    BooksPanelComponent
  ],
  providers: [
    {
      provide: 'BooksService',
      useClass: HttpBooksService
    },
    {
      provide: 'BooksData',
      useValue: booksData
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class BooksModule {
}
