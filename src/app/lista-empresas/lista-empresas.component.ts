import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Router} from "@angular/router"

import { EmpresaService } from '../services/empresa.service';
import { Empresa } from '../models/Empresa';

import { Observable } from 'rxjs';
import {ConfirmationService} from 'primeng/api';
import { ImagesService } from '../services/images.service';
import { Imagem } from '../models/Imagem';


@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {

  empresas: Empresa[];
  imagem: any = [];
  empresas$: Observable<Empresa[]>;
  imagem$: Observable<Imagem>;
  public alterar: Boolean;

  constructor(
    private empresaService: EmpresaService,
    private imagesService: ImagesService,
    private confirmationService: ConfirmationService,
    private location: Location,
    private router: Router
    ) { }

  confirmDelete(empresa: Empresa) {
    this.confirmationService.confirm({
        message: `<p>Tem certeza de que deseja excluir a Empresa ${empresa.nome}?</p>
        <p><strong>Obs:</strong> Todos os funcionários também serão excluídos</p>`,
        accept: () => {
          this.empresaService.remove(empresa.id).subscribe(
            success => this.onRefresh(),
            error => console.error(error)
          );
        }
    });
  }

  ngOnInit() {
    this.onRefresh();
    // this.empresas$.subscribe(
    //   empresas => {
    //     return empresas.forEach((empresa: Empresa) => {
    //       empresa['imagem'] = this.getImage(empresa.idArquivo);
    //       return empresa;
    //     }

    //     );
    //   });

    // this.imagem$ = this.imagesService.getImagem(this.empresas$.idArquivo);
  }

  onRefresh() {
    this.empresas$ = this.empresaService.listWhithFiles()
    // this.empresas$ = this.empresaService.listar()
  }

  getImage(id:number){
    return this.imagesService.getImage(id)
      .subscribe((imagem) => imagem);
  }

  doUpload(id:Number){
    this.router.navigate(['/empresa', 'upload', id]);
  }

  alterarImagem(){
    this.alterar = true;
  }

  convertForBase64(byteImg){
    return 'data:image/png;base64,'+byteImg;
  }

}
