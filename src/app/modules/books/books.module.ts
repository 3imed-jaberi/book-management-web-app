import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  BookListComponent,
  BookDetailsComponent,
  BookCreateComponent,
  BookEditComponent,
} from './components';
import { BooksRoutingModule } from './books-routing.module';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    BookCreateComponent,
    BookEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
