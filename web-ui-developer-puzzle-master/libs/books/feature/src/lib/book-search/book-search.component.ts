import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  getReadingList,
  ReadingListBook,
  removeFromReadingList,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  readingList;
  searchForm = this.fb.group({
    term: '',
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe((books) => {
      this.books = books;
    });
    
    this.searchForm.get('term').valueChanges
    .pipe(debounceTime(500))
    .subscribe(response=>{
      if(response && response.length){
        this.searchBooks()
      }
      else{
        this.store.dispatch(clearSearch())
      }
    })
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.openSnackBar('Added', 'Undo', book);
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
      console.log("books",this.books);
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  openSnackBar(message, action, book) {
    let snackBarRef = this.snackBar.open(message, action, {duration:2000});

    snackBarRef.onAction().subscribe(() => {
      this.store.select(getReadingList).subscribe((books) => {
        this.readingList = books;
      });
      let item = this.readingList.find((books) => books.bookId == book.id);
      this.store.dispatch(removeFromReadingList({ item }));
    });
  }
}
