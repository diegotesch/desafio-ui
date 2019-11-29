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

  public getById(id:number):Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.API}/${id}`).pipe(take(1));
  }

  public getFuncionariosEmpresa(id:number): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.API}/${id}/empresa`).pipe(tap(console.log));
  }

  private create(pessoa){
    return this.http.post(this.API, pessoa).pipe(take(1));
  }

  private update(pessoa){
    return this.http.put(this.API, pessoa).pipe(take(1));
  }

  public save(pessoa){
    if(pessoa.id)
      return this.update(pessoa);
    return this.create(pessoa);
  }

  public remove(id:number){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
