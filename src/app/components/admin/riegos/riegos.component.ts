import * as $ from 'jquery';
import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Title }  from '@angular/platform-browser';

import { Riego } from '../../../models/riego';
import { RiegoService } from '../../../services/riego.service'
import { Router } from '@angular/router';

@Component({
  templateUrl: './riegos.component.html',
  styleUrls: ['./riegos.component.css']
})
export class RiegosComponent{

  constructor(private reigoService: RiegoService, private router:Router, private toastr: ToastrService, private title: Title){
    this.title.setTitle("Riegos - AUPA 5");
  }

  riegos: Riego[] =  [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit() {
    let admin = localStorage.getItem('admin');
    if(admin == '0'){
      this.getRiegosNoAdmin();
    }else{
      this.getRiegos();
    }
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
      language:{
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ riegos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ riegos",
        infoEmpty: "Ningún riego por mostrar",
        loadingRecords: "Cargando riegos...",
        zeroRecords: "No se encontraron riegos",
        emptyTable: "No hay datos de riego disponibles",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
      },
      ordering: true,
      lengthMenu: [5, 10, 20, 50, 100]
    };
  }

  getRiegos(){
      this.reigoService.getRiegosInfo()
      .subscribe(
        res => {
          this.riegos = res;
          this.dtTrigger.next();
        },
        err => this.toastr.error('No se han podido obtener los riegos')
      )
  }

  getRiegosNoAdmin(){
      this.reigoService.getRiegosSeccion()
      .subscribe(
        res => {
          console.log(res);
          this.riegos = res;
          this.dtTrigger.next();
        },
        err => this.toastr.error('No se han podido obtener los riegos')
      )
  }

  

  deleteRiego(id_riego){
    this.reigoService.deleteRiego(id_riego)
      .subscribe(
        res => {
          this.toastr.success('Riego eliminado correctamente');
          this.dtTrigger.unsubscribe();
          this.getRiegos();
        },
        err => {
          this.toastr.error('No se ha podido eliminar el registro de riego')
        }
      )
  }
}
