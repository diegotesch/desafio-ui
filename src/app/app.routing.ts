import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { FormEmpresaComponent } from './form-empresa/form-empresa.component';
import { FormEmpresaNovoComponent } from './form-empresa-novo/form-empresa-novo.component';


const app_routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empresas', component: ListaEmpresasComponent },
  { path: 'empresas/:acao', component: FormEmpresaNovoComponent },
  { path: 'empresas/:acao/:id', component: FormEmpresaComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);
