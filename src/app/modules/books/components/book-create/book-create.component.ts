import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import type { NgForm } from '@angular/forms';

import { z } from 'zod';

import { Book, bookSchema } from '../../models';
import { BookService } from '../../services';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent implements OnInit {
  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    publishedDate: new Date(),
    editor: '',
  };

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {}

  randomId() {
    const max = 1000;
    const min = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  createBook(bookForm: NgForm) {
    if (bookForm.invalid) return;
    const formValues = bookSchema.parse({
      id: this.randomId(),
      ...bookForm.value,
      publishedDate: new Date(bookForm.value?.publishedDate),
    }) satisfies Book;

    this.bookService.addBook(formValues).subscribe({
      next: (createdBook) => {
        console.log('New book created:', createdBook);
        this.router.navigate(['books', createdBook.id]);
      },
      error: (error) => {
        console.error('Error creating book:', error);
      },
    });
  }

  goBack() {
    this.router.navigate(['book', 'list']);
  }
}
