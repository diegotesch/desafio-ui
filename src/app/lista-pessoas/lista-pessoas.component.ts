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

  confirmDelete(pessoa: Pessoa) {
    console.log(pessoa);
    this.confirmationService.confirm({
        message: `<p>Tem certeza de que deseja excluir a Pessoa ${pessoa.nome}?</p>`,
        accept: () => {
          this.pessoaService.remove(pessoa.id).subscribe(
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
    this.pessoas$ = this.pessoaService.list()
  }

}
