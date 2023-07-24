import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Book, bookSchema } from '../../models';
import { BookService } from '../../services';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  bookId?: number;
  book?: Book;
  private routeSubscription?: Subscription;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.bookId = +params['id'];
      this.loadBookDetails();
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }

  loadBookDetails() {
    if (!this.bookId) return;
    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (error) => {
        console.error('Error fetching book:', error);
      },
    });
  }

  updateBook(bookForm: NgForm) {
    if (!this.bookId || bookForm.invalid) return;
    const formValues = bookSchema.parse({
      id: this.bookId,
      ...bookForm.value,
      publishedDate: new Date(bookForm.value?.publishedDate),
    }) satisfies Book;

    this.bookService.updateBook(formValues).subscribe({
      next: (updatedBook) => {
        console.log('Book updated:', updatedBook);
        this.goBack();
      },
      error: (error) => {
        console.error('Error updating book:', error);
      },
    });
  }

  goBack() {
    this.router.navigate(['books']);
  }
}
