import {BookModel} from "./book.model";

const book = new BookModel();
book.id = 1;
book.title = 'Angular in action';
book.authors = 'Jan Kowalski';
book.category = '#ffbe3c';
book.bestseller = true;
book.rating = 3;

export default [book];
