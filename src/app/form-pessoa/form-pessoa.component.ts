import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { EmpresaService } from '../services/empresa.service';
import { PessoaService } from '../services/pessoa.service';
import { Empresa } from '../models/Empresa';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-form-pessoa',
  templateUrl: './form-pessoa.component.html',
  styleUrls: ['./form-pessoa.component.css'],
  providers: [MessageService]
})
export class FormPessoaComponent implements OnInit {

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
  public empresas: Empresa[];
  public idEmpresa: Empresa;

  public empresas$: Observable<Empresa[]>;

  inscricao: Subscription;

  pt: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private empresaService: EmpresaService,
    private pessoaService: PessoaService,
    private location: Location
  ) { }

  ngOnInit() {
    const pessoa = this.route.snapshot.data['pessoa'];

    this.empresas$ = this.empresaService.getDropDown();
    this.empresas$.subscribe(empresas => this.empresas = empresas);

    this.form = this.formBuilder.group({
      id: [pessoa.id],
      nome: [pessoa.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      cpf: [pessoa.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      dataNascimento: [new Date(pessoa.dataNascimento), [Validators.required]],
      idEmpresa: [pessoa.idEmpresa, [Validators.required]]
    });

    this.title = this.getTitle(pessoa.nome);

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezemrbo" ],
      monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dec" ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sem'
    };
  }

  getTitle(nome:any):string {
    if(nome)
      return `Atualizar Pessoa: ${nome}`;
    return "Cadastro de Pessoas";
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

    let titleMsg : string = "Cadastro de Pessoas";
    let msgSuccess : string = "Pessoa cadastrada com sucesso!";
    let msgError : string = "Erro ao cadastrar Pessoa";
    if(this.form.value.id){
      titleMsg = "Atualizar Pessoa";
      msgSuccess = "Pessoa atualizada com sucesso!";
      msgError = "Erro ao atualizar pessoa";
    }

    this.submitted = true;
    if(this.form.valid){

      this.pessoaService.save(this.form.value).subscribe(
        success => {
          this.messageService.add({severity:'success', summary: titleMsg, detail: msgSuccess});
          setTimeout(()=>this.location.back(), 2000);
        },
        error => this.messageService.add({severity:'error', summary: titleMsg, detail: msgError})
      );
      return;
    }

    this.getError('nome');
    this.getError('cpf');
    this.getError('dataNascimento');
    this.getError('idEmpresa');

  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    this.location.back();
  }

}
