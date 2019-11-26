import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items = [];

  activeItem;

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Home', icon: 'pi pi-home', link: ''},
      {label: 'Empresas', icon: 'pi pi-briefcase', link : '/empresas'},
      {label: 'Teste', icon: 'pi pi-users', link: '/teste'}
    ];

    this.activeItem = this.items[0];
  }

  ativarItem(event, index) {
    this.activeItem = this.items[index];
  }

}
