import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GerenciadorModule } from './gerenciador/gerenciador.module';
import { SearchComponent } from './shared/components/search/search.component';
import { FormsComponent } from './shared/components/forms/forms.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FormsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GerenciadorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
