import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { GerenciadorRoutingModule } from './gerenciador-routing.module';
import { GerenciadorComponent } from './gerenciador.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsComponent } from './cadastro/forms/forms.component';
import { SearchComponent } from './cadastro/search/search.component';

@NgModule({
  declarations: [
    GerenciadorComponent,
    CadastroComponent,
    FormsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    GerenciadorRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, 
  ]
})
export class GerenciadorModule { }
