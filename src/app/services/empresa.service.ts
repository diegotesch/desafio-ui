import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Empresa } from '../models/Empresa';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly API = `${environment.API}empresas`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.API);
  }

  getEmpresa(id:number):Observable<Empresa> {
    return this.http.get<Empresa>(`${this.API}/${id}`).pipe(tap(console.log));
  }


}
