import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BooksPanelComponent} from './component/books-panel/books-panel.component';
import {BooksListComponent} from './component/books-list/books-list.component';
import {BookFormComponent} from './component/book-form/book-form.component';
import {BookResolver} from "./resolver/book.resolver";


const routes: Routes = [
  {
    path: 'books/panel',
    component: BooksPanelComponent
  },
  {
    path: 'books/list',
    component: BooksListComponent
  },
  {
    path: 'books/list/:id',
    component: BookFormComponent,
    resolve: { book: BookResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {
}
