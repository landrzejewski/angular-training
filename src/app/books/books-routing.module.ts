import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BooksPanelComponent} from './component/books-panel/books-panel.component';
import {BooksListComponent} from './component/books-list/books-list.component';
import {BookFormComponent} from './component/book-form/book-form.component';
import {BookResolver} from "./resolver/book.resolver";
import {UserRoleGuard} from '../security/guard/user-role.guard';


const routes: Routes = [
  {
    path: 'panel',
    component: BooksPanelComponent
  },
  {
    path: 'list',
    component: BooksListComponent,
    canActivate: [UserRoleGuard],
    children:[
      {
        path: ':id',
        component: BookFormComponent,
        resolve: { book: BookResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {
}
