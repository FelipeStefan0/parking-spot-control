import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenciadorComponent } from './gerenciador/gerenciador.component';

const routes: Routes = [
  // { path: 'gerenciador', component: GerenciadorComponent},
  { 
    path: 'gerenciador',
    loadChildren: () => import("./gerenciador/gerenciador.module").then(
      (m) => m.GerenciadorModule)
  },
  { path: '**', redirectTo: 'gerenciador', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
