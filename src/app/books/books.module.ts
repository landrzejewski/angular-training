import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookCardComponent} from './component/book-card/book-card.component';
import {BookFormComponent} from './component/book-form/book-form.component';
import {FormsModule} from '@angular/forms';
import {BooksPanelComponent} from './component/books-panel/books-panel.component';
import {SharedModule} from '../shared/shared.module';
import booksData from '../books/model/books.data';

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
    // ArrayBooksService
    {
      provide: 'BooksData',
      useValue: booksData
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class BooksModule {
}
