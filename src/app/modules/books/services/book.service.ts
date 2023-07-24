// src/app/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Book } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl(...params: string[]): string {
    const baseURL = 'http://localhost:3000/api/v1';
    const endpoint = 'books';
    return [baseURL, endpoint, params].flat(1).filter(Boolean).join('/');
  }

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error.message || 'Server error');
  }

  getBooks(): Observable<Book[]> {    
    return this.http
      .get<Book[]>(this.apiUrl())
      .pipe(catchError(this.handleError));
  }

  getBookById(id: number): Observable<Book> {
    return this.http
      .get<Book>(this.apiUrl(String(id)))
      .pipe(catchError(this.handleError));
  }

  addBook(book: Book): Observable<Book> {
    return this.http
      .post<Book>(this.apiUrl(), book)
      .pipe(catchError(this.handleError));
  }

  updateBook(book: Book): Observable<Book> {
    return this.http
      .put<Book>(this.apiUrl(String(book.id)), book)
      .pipe(catchError(this.handleError));
  }

  deleteBook(id: number): Observable<void> {
    return this.http
      .delete<void>(this.apiUrl(String(id)))
      .pipe(catchError(this.handleError));
  }
}
