import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Pessoa } from '../models/Pessoa';
import { PessoaService } from '../services/pessoa.service';

@Injectable({
  providedIn: 'root'
})
export class PessoaResolverGuard implements Resolve<Pessoa> {
  constructor(
    private pessoaService: PessoaService
  ) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Pessoa> {
    if ( route.params && route.params['id']) {
      return this.pessoaService.getById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      dataNascimento: null,
      cpf: null,
      idEmpresa: null
    });
  }
}
