import { Component } from '@angular/core';
import * as $ from 'jquery';
import { Title }  from '@angular/platform-browser';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{
  constructor(private title: Title){
    this.title.setTitle("Menu - AUPA 5");
  }

  isAdmin: Boolean = false;
  ngOnInit(){
    if(localStorage.getItem('admin') == '1'){
      this.isAdmin = true;
    }
  }
}
