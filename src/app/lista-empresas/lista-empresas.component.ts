import { Component, OnInit } from '@angular/core';

import { EmpresaService } from '../services/empresa.service';

import { Empresa } from '../models/Empresa';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {

  empresas: Empresa[];

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    this.empresaService.listar()
      .subscribe(res => this.empresas = res);
  }

}
