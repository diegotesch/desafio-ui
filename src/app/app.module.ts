import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';

import {TableModule} from 'primeng/table';
import {MenuModule} from 'primeng/menu';
import {TabMenuModule} from 'primeng/tabmenu';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DataViewModule} from 'primeng/dataview';

import { AppComponent } from './app.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';

import { EmpresaService } from './services/empresa.service';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';

import { CnpjPipe } from './pipes/cnpj.pipe';
import { CpfPipe } from './pipes/cpf.pipe';
import { FormEmpresaNovoComponent } from './form-empresa-novo/form-empresa-novo.component';
import { ListaPessoasComponent } from './lista-pessoas/lista-pessoas.component';
import { FormPessoaComponent } from './form-pessoa/form-pessoa.component';
import { ListaFuncionariosEmpresaComponent } from './lista-funcionarios-empresa/lista-funcionarios-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaEmpresasComponent,
    MenuComponent,
    HomeComponent,
    CnpjPipe,
    CpfPipe,
    FormEmpresaNovoComponent,
    ListaPessoasComponent,
    FormPessoaComponent,
    ListaFuncionariosEmpresaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    MenuModule,
    TabMenuModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    InputMaskModule,
    PanelModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    CalendarModule,
    DropdownModule,
    DataViewModule,
    routing
  ],
  providers: [
    EmpresaService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
