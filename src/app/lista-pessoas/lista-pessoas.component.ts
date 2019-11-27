import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../models/Pessoa';
import { Observable } from 'rxjs';
import { PessoaService } from '../services/pessoa.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css']
})
export class ListaPessoasComponent implements OnInit {

  public pessoas: Pessoa[];
  public pessoas$: Observable<Pessoa[]>;

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    setTimeout(() => this.onRefresh(), 1000);
  }

  onRefresh() {
    this.pessoas$ = this.pessoaService.list()
  }

}
