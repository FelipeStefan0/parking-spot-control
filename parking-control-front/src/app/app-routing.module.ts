import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: '',
    loadChildren: () => import("./home/home.module").then(
      (m) => m.HomeModule)
  },
  { 
    path: 'gerenciador',
    loadChildren: () => import("./gerenciador/gerenciador.module").then(
      (m) => m.GerenciadorModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
