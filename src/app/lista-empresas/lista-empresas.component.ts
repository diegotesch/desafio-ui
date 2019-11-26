import { Component, OnInit } from '@angular/core';

import { EmpresaService } from '../services/empresa.service';

import { Empresa } from '../models/Empresa';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {

  empresas: Empresa[];
  empresas$: Observable<Empresa[]>;

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    // this.empresaService.listar()
    //   .subscribe(res => this.empresas = res);
    setTimeout(() => this.empresas$ = this.empresaService.listar(), 2000);
  }

}
