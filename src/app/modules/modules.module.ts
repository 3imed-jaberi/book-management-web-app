import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksModule } from './books/books.module';
import { NotFoundModule } from './not-found/not-found.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BooksModule,
    NotFoundModule
  ]
})
export class ModulesModule { }
