import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EmpresaService } from '../services/empresa.service';

import { Empresa } from '../models/Empresa';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

  id: number;
  inscricao: Subscription;
  empresa: Empresa;
  titulo: string;

  constructor(private route: ActivatedRoute, private empresaService: EmpresaService) {
  }

  ngOnInit() {
    this.inscricao = this.route.params
      .subscribe((params:any) => this.id = params['id']);

    this.empresaService.getEmpresa(this.id)
      .subscribe(res => this.empresa = res);

    this.titulo = !this.id ? "Cadastrar" : "Editar";
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  onSubmit(form){
    console.log(form);

    console.log(this.empresa);
  }

}
