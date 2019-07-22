import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  books = [
    {
      id: 1,
      title: 'Angular in action',
      authors: 'Jan Kowalski',
      category: '#ffbe3c',
      bestseller: true
    },
    {
      id: 2,
      title: 'React in action',
      authors: 'Marek Nowak',
      category: '#4ba5ff',
      bestseller: false
    }
    ];
  selectedBook = null;
  editedBook = null;
  titleSize = 18;

  get authorsStyle() {
    return {
      color: 'gray',
      letterSpacing: '2px'
    };
  }

  select(book) {
    this.selectedBook = book;
    this.editedBook =  {...book}; // Object.assign({}, book);
  }

  isSelected(book): boolean {
    return book === this.selectedBook;
  }

  save() {
    Object.assign(this.selectedBook, this.editedBook);
    this.reset();
  }

  reset() {
    this.selectedBook = null;
    this.editedBook = null;
  }

}
