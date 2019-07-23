import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingComponent} from './component/rating/rating.component';


@NgModule({
  declarations: [
    RatingComponent
  ],
  exports: [
    RatingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
