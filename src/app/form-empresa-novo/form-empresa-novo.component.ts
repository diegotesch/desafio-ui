import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { EmpresaService } from '../services/empresa.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  arrErrors: any = ['required', 'minlength', 'maxlength'];
  arrMsgErrors: any = [
    {id: 'required', msg: "Campo é de preechimento Obrigatório"  },
    {id: 'minlength', msg: "Campo não atende o tamanho mínimo de caracteres: " },
    {id: 'maxlength', msg: "Campo ultrapassa a quantidade de caracteres exigida: "}
  ];
  acao: string;
  title: string;

  inscricao: Subscription;




  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private empresaService: EmpresaService,
    private location: Location
  ) { }

  // console.log(this.route.params);

  ngOnInit() {
    // this.inscricao = this.route.params
    //   .subscribe((params:any) => {
    //   this.acao = params.acao;
    //   this.idEmpresa = params.id;
    //   const empresa$ = this.empresaService.getById(this.idEmpresa);
    //   empresa$.subscribe(empresa => this.updateForm(empresa));
    // });

    // this.route.params
    //   .pipe(
    //     map((params:any) => params['acao']),
    //     switchMap(acao => this.getTitle(acao))
    //   )
    //   .subscribe(titulo => this.title = titulo);

    const empresa = this.route.snapshot.data['empresa'];

    this.form = this.formBuilder.group({
      id: [empresa.id],
      nome: [empresa.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      endereco: [empresa.endereco, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      cnpj: [empresa.cnpj, [Validators.required, Validators.minLength(18), Validators.maxLength(18)]]
    });

    this.title = this.getTitle(empresa.nome);
  }

  // updateForm(empresa) {
  //   this.form.patchValue({
  //     id: empresa.id,
  //     nome: empresa.nome,
  //     endereco: empresa.endereco,
  //     cnpj: empresa.cnpj
  //   })
  // }
  getTitle(nome:any):string {
    if(nome)
      return `Atualizar Empresa: ${nome}`;
    return "Cadastro de Empresas";
  }

  hasError(field:string ) {
    return this.form.get(field).errors;
  }

  getError(field: string) {
    if(this.hasError(field)){
      let err = this.arrErrors.filter((erro) => this.hasError(field)[erro])[0];
      let requiredLength = this.hasError(field)[err].requiredLength ? this.hasError(field)[err].requiredLength : '';
      this.messageService.add({severity:'error', summary:`Campo ${field}: ${err}`, detail:`${this.getErrorMsg(err).msg} ${requiredLength}`});
    }
  }

  getErrorMsg(error: string): any{
    return this.arrMsgErrors.filter((item) => item.id == error)[0];
  }

  onSubmit(){

    let titleMsg : string = "Cadastro de Empresas";
    let msgSuccess : string = "Empresa cadastrada com sucesso!";
    let msgError : string = "Erro ao cadastrar empresa";
    if(this.form.value.id){
      titleMsg = "Atualizar Empresa";
      msgSuccess = "Empresa atualizada com sucesso!";
      msgError = "Erro ao atualizar empresa";
    }

    this.submitted = true;
    if(this.form.valid){

      this.empresaService.save(this.form.value).subscribe(
        success => {
          this.messageService.add({severity:'success', summary: titleMsg, detail: msgSuccess});
          setTimeout(()=>this.location.back(), 2000);
        },
        error => this.messageService.add({severity:'error', summary: titleMsg, detail: msgError})
      );
      return;
    }

    this.getError('nome');
    this.getError('endereco');
    this.getError('cnpj');

  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    this.location.back();
  }

}
