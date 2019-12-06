import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { Imagem } from '../models/Imagem';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private readonly API = `${environment.API}arquivos`;

  constructor(
    private http: HttpClient
  ) { }

  public getImage(id: number): Observable<Imagem> {
    return this.http.get<Imagem>(`${this.API}/${id}`).pipe(take(1));
  }
}
