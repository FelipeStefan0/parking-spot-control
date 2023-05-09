import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { GerenciadorComponent } from './gerenciador.component';

const routes: Routes = [
  { path: '',
    component: GerenciadorComponent,
    children: [
      { path: 'cadastro', component: CadastroComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciadorRoutingModule { }
