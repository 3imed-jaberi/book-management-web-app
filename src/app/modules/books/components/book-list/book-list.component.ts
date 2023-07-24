import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../../models';
import { BookService } from '../../services';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books$?: Observable<Book[]>;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.books$ = this.bookService.getBooks();
  }

  createBook() {
    this.router.navigate(['books', 'create']);
  }

  viewBookDetails(bookId: number) {
    this.router.navigate(['books', bookId]);
  }

  editBook(bookId: number) {
    this.router.navigate(['books', 'edit', bookId]);
  }

  deleteBook(bookId: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe(() => {
        this.loadBooks();
      });
    }
  }
}
