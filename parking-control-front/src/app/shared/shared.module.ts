import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CardComponent } from './components/card/card.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
  
    PaginationComponent,
       CardComponent,
       LoaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
  ]
})
export class SharedModule { }
