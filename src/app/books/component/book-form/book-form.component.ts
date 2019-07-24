import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookModel} from '../../model/book.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  @Input()
  book = new BookModel();
  titleSize = 18;
  @Output()
  saved = new EventEmitter();
  @Output()
  canceled = new EventEmitter();
  genres = ['Horror', 'Adventure', 'Drama', 'Romans'];
  ratings = [1, 2, 3, 4 ,5];
  isEditable = true;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.data.book) {
      this.book = this.route.snapshot.data.book;
      this.isEditable = false;
    }
  }

  saveBook(bookForm) {
    if (bookForm.valid) {
      this.saved.emit(this.book);
    }
  }

}
