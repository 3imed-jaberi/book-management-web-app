// src/app/modules/books/books-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  BookListComponent,
  BookDetailsComponent,
  BookCreateComponent,
  BookEditComponent,
} from './components';

const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'books/create', component: BookCreateComponent },
  { path: 'books/edit/:id', component: BookEditComponent },
  { path: 'books/:id', component: BookDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
