import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { Pessoa } from '../models/Pessoa';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly API = `${environment.API}pessoas`;

  constructor(private http: HttpClient) { }

  public list(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API);
  }
}
