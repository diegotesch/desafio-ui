import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';

import {TableModule} from 'primeng/table';
import {MenuModule} from 'primeng/menu';
import {TabMenuModule} from 'primeng/tabmenu';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {MenuItem} from 'primeng/api';

import { AppComponent } from './app.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';

import { EmpresaService } from './services/empresa.service';
import { MenuComponent } from './menu/menu.component';
import { FormEmpresaComponent } from './form-empresa/form-empresa.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ListaEmpresasComponent,
    MenuComponent,
    FormEmpresaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    MenuModule,
    TabMenuModule,
    ButtonModule,
    TooltipModule,
    routing
  ],
  providers: [
    EmpresaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
