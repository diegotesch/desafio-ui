import { Component, OnInit } from '@angular/core';

import { EmpresaService } from '../services/empresa.service';

import { Empresa } from '../models/Empresa';
import { Pessoa } from '../models/Pessoa';
import { Observable } from 'rxjs';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {

  empresas: Empresa[];
  empresas$: Observable<Empresa[]>;

  constructor(
    private empresaService: EmpresaService,
    private confirmationService: ConfirmationService
    ) { }

  confirmDelete(empresa: Empresa) {
    this.confirmationService.confirm({
        message: `<p>Tem certeza de que deseja excluir a Empresa ${empresa.nome}?</p>
        <p><strong>Obs:</strong> Todos os funcionários também serão excluídos</p>`,
        accept: () => {
          this.empresaService.remove(empresa.id).subscribe(
            success => this.onRefresh(),
            error => console.error(error)
          );
        }
    });
  }

  ngOnInit() {
    setTimeout(() => this.onRefresh(), 1000);
  }

  onRefresh() {
    this.empresas$ = this.empresaService.listar()
  }

  listarFuncionarios(empresa: Empresa) {
    console.log(empresa)
  }

}
