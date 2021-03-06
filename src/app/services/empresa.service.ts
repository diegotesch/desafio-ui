import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { Empresa } from '../models/Empresa';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly API = `${environment.API}empresas`;

  constructor(private http: HttpClient) { }

  public listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.API);
  }

  public listWhithFiles() : Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.API}/files`);
  }

  public getDropDown(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.API}/dropdown`).pipe(take(1));
  }

  private create(empresa){
    return this.http.post(this.API, empresa).pipe(take(1));
  }

  public upload(formData: any){
    return this.http.post(`${this.API}/upload`, formData);
  }

  private update(empresa){
    return this.http.put(this.API, empresa).pipe(take(1));
  }

  public getById(id:number):Observable<Empresa> {
    return this.http.get<Empresa>(`${this.API}/${id}`).pipe(take(1));
  }

  public save(empresa){
    if(empresa.id)
      return this.update(empresa);
    return this.create(empresa);
  }

  public remove(id:number){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
