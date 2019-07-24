import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingComponent} from './component/rating/rating.component';
import {AppEmailValidator} from './validator/email.validator';
import {ErrorsComponent} from './component/errors/errors.component';
import {HighlightDirective} from './directive/highlight.directive';
import {RepeatDirective} from './directive/repeatDirective';
import {CapitalizePipe} from './pipe/capitalize.pipe';


@NgModule({
  declarations: [
    RatingComponent,
    AppEmailValidator,
    ErrorsComponent,
    HighlightDirective,
    RepeatDirective,
    CapitalizePipe
  ],
  exports: [
    RatingComponent,
    AppEmailValidator,
    ErrorsComponent,
    HighlightDirective,
    RepeatDirective,
    CapitalizePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
