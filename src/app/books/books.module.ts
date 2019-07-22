import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookCardComponent} from './component/book-card/book-card.component';


@NgModule({
  declarations: [
    BookCardComponent
  ],
  exports: [
    BookCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BooksModule {
}
