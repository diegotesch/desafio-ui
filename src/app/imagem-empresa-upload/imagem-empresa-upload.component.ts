import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Empresa } from '../models/Empresa';
import { EmpresaService } from '../services/empresa.service';
import { environment } from 'src/environments/environment';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-imagem-empresa-upload',
  templateUrl: './imagem-empresa-upload.component.html',
  styleUrls: ['./imagem-empresa-upload.component.css'],
  providers: [MessageService]
})
export class ImagemEmpresaUploadComponent implements OnInit {

  public empresa: Empresa;
  public empresa$: Observable<Empresa>;
  private idEmpresa: Number;
  public teste: any;

  public files: File;
  public readonly urlUpload: String = `${environment.API}empresas/upload/`

  constructor(
    private empresaService: EmpresaService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idEmpresa = this.route.snapshot.params.id;

    this.route.params.pipe(
      map((params: any) => params['id']),
      switchMap(id => this.empresaService.getById(id))
    ).subscribe((empresa: any) => this.empresa = empresa);

  }

  upou(file){
    let formData = new FormData()
    formData.append('file', file.files[0]);
    formData.append('empresa', new Blob([JSON.stringify(this.empresa)], { type: 'application/json'}));

    this.empresaService.upload(formData).subscribe(
      success => {
        this.messageService.add({severity:'success', summary:`Upload Efetuado com sucesso`, detail:`Imagem anexada a empresa ${this.empresa.nome}`})
        setTimeout(()=>this.location.back(), 2000);
      },
      error => this.messageService.add({severity:'error', summary:`Falha no Upload`, detail:`Ocorreu um erro ao anexar imagem`})
    );
  }



}
