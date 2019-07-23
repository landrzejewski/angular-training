import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingComponent} from './component/rating/rating.component';
import {AppEmailValidator} from './validator/email.validator';
import { ErrorsComponent } from './component/errors/errors.component';


@NgModule({
  declarations: [
    RatingComponent,
    AppEmailValidator,
    ErrorsComponent
  ],
  exports: [
    RatingComponent,
    AppEmailValidator,
    ErrorsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
