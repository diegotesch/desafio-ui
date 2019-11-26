import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EmpresaService } from '../services/empresa.service';

import { Empresa } from '../models/Empresa';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { Location } from '@angular/common'

@Component({
  selector: 'app-form-empresa-novo',
  templateUrl: './form-empresa-novo.component.html',
  styleUrls: ['./form-empresa-novo.component.css'],
  providers: [MessageService]
})
export class FormEmpresaNovoComponent implements OnInit {

  form: FormGroup;
  submitted: boolean;


  inscricao: Subscription;
  acao: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private empresaService: EmpresaService,
    private location: Location
  ) { }

  ngOnInit() {
    this.inscricao = this.route.params
      .subscribe((params:any) => this.acao = params.acao);

    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      endereco: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      cnpj: [null, [Validators.required, Validators.minLength(18), Validators.maxLength(18)]]
    })
  }

  hasError(field:string ) {
    return this.form.get(field).errors;
  }

  onSubmit(){

    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid){

      this.empresaService.create(this.form.value).subscribe(
        success => {
          this.messageService.add({severity:'success', summary:'Cadastro de Empresa', detail:'Empresa cadastrada com sucesso!'});
          setTimeout(()=>this.location.back(), 2000);
        },
        error => this.messageService.add({severity:'error', summary:'Erro ao cadastrar', detail:error})
      );
      return;
    }

    this.messageService.add({severity:'error', summary:'Cadastro de Empresa', detail:'Falha ao enviar dados'});
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    console.log('cancel');
  }

}
