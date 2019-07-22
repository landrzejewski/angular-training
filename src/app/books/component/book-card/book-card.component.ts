import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookModel} from '../../model/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  @Input()
  book = new BookModel();
  @Input()
  isSelected = false;
  @Output()
  private selected = new EventEmitter();

  get authorsStyle() {
    return {
      color: 'gray',
      letterSpacing: '2px'
    };
  }

  select() {
    this.selected.emit(this.book);
  }

}
