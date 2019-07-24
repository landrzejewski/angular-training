import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BooksPanelComponent} from "./component/books-panel/books-panel.component";
import {BooksListComponent} from "./component/books-list/books-list.component";


const routes: Routes = [
  {
    path: 'books/panel',
    component: BooksPanelComponent
  },
  {
    path: 'books/list',
    component: BooksListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {
}
