import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, NoPreloading} from '@angular/router';
import {environment} from "../environments/environment";


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    children: [
      {
        path: 'books/panel',
        loadChildren: './books/books.module#BooksModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
     preloadingStrategy: NoPreloading
   // useHash: true,
   // enableTracing: environment.enableTracing
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
