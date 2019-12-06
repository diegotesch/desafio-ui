import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Empresa } from '../models/Empresa';
import { EmpresaService } from '../services/empresa.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaResolverGuard implements Resolve<Empresa> {

  constructor(private empresaService: EmpresaService) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Empresa> {
    if ( route.params && route.params['id'] ) {
      return this.empresaService.getById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      endereco: null,
      cnpj: null,
      idArquivo: null
    });
  }

}
