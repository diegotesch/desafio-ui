import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ListaEmpresasComponent } from "./lista-empresas/lista-empresas.component";
import { FormEmpresaNovoComponent } from "./form-empresa-novo/form-empresa-novo.component";
import { EmpresaResolverGuard } from "./guards/empresa-resolver.guard";
import { ListaPessoasComponent } from './lista-pessoas/lista-pessoas.component';

const app_routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "empresas", component: ListaEmpresasComponent },
  {
    path: "empresas/:acao",
    component: FormEmpresaNovoComponent,
    resolve: {
      empresa: EmpresaResolverGuard
    }
  },
  {
    path: "empresas/:acao/:id",
    component: FormEmpresaNovoComponent,
    resolve: {
      empresa: EmpresaResolverGuard
    }
  },
  { path: "pessoas", component: ListaPessoasComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);
