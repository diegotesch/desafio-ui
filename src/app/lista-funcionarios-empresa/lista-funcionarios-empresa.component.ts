import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PessoaService } from '../services/pessoa.service';
import { Pessoa } from '../models/Pessoa';

@Component({
  selector: 'app-lista-funcionarios-empresa',
  templateUrl: './lista-funcionarios-empresa.component.html',
  styleUrls: ['./lista-funcionarios-empresa.component.css']
})
export class ListaFuncionariosEmpresaComponent implements OnInit {

  public funcionarios: Pessoa[];
  inscricao: Subscription;


  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private location: Location
  ) { }

  ngOnInit() {

    this.route.params.pipe(
      map((params: any) => params['id']),
      switchMap(id => this.pessoaService.getFuncionariosEmpresa(id))
    ).subscribe((funcionarios: any) => this.funcionarios = funcionarios);

  }

  voltar(): void{
    this.location.back();
  }
}
