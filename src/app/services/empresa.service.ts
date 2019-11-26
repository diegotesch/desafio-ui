import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Empresa } from '../models/Empresa';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  URL_API = '/api/empresas';

  constructor(private http: HttpClient) { }

  listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.URL_API);
  }
}
