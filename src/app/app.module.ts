import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';

import {TableModule} from 'primeng/table';
import {MenuModule} from 'primeng/menu';
import {TabMenuModule} from 'primeng/tabmenu';

import { AppComponent } from './app.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';

import { EmpresaService } from './services/empresa.service';

@NgModule({
  declarations: [
    AppComponent,
    ListaEmpresasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    MenuModule,
    TabMenuModule,
  ],
  providers: [
    EmpresaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
