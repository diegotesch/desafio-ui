import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ListaEmpresasComponent } from "./lista-empresas/lista-empresas.component";
import { FormEmpresaNovoComponent } from "./form-empresa-novo/form-empresa-novo.component";
import { EmpresaResolverGuard } from "./guards/empresa-resolver.guard";
import { ListaPessoasComponent } from "./lista-pessoas/lista-pessoas.component";
import { FormPessoaComponent } from "./form-pessoa/form-pessoa.component";
import { PessoaResolverGuard } from "./guards/pessoa-resolver.guard";
import { ListaFuncionariosEmpresaComponent } from "./lista-funcionarios-empresa/lista-funcionarios-empresa.component";
import { ImagemEmpresaUploadComponent } from './imagem-empresa-upload/imagem-empresa-upload.component';

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
  { path: "empresa/upload/:id", component: ImagemEmpresaUploadComponent },
  {
    path: "empresa/:id/funcionarios",
    component: ListaFuncionariosEmpresaComponent
  },
  { path: "pessoas", component: ListaPessoasComponent },
  {
    path: "pessoas/:acao",
    component: FormPessoaComponent,
    resolve: {
      pessoa: PessoaResolverGuard
    }
  },
  {
    path: "pessoas/:acao/:id",
    component: FormPessoaComponent,
    resolve: {
      pessoa: PessoaResolverGuard
    }
  },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);
