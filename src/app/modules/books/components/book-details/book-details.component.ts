import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../models';
import { BookService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book?: Book;
  bookId?: number;
  private routeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
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
        console.error('Error fetching book details:', error);
      },
    });
  }

  goBack() {
    this.router.navigate(['books']);
  }
}
