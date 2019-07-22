import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookModel} from '../../model/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {

  @Input()
  book = new BookModel();
  titleSize = 18;
  @Output()
  saved = new EventEmitter();
  @Output()
  canceled = new EventEmitter();

}
