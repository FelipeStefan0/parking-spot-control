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

@NgModule({
  declarations: [
    GerenciadorComponent,
    CadastroComponent,
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
