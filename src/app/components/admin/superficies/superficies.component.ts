import * as $ from 'jquery';
import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Title }  from '@angular/platform-browser';

import { Superficie } from '../../../models/superficie';
import { SuperficieService } from '../../../services/superficie.service'
import { Router } from '@angular/router';

@Component({
  templateUrl: './superficies.component.html',
  styleUrls: ['./superficies.component.css']
})
export class SuperficiesComponent{

  constructor(private superfocieService: SuperficieService, private router:Router, private toastr: ToastrService, private title: Title){
    this.title.setTitle("Superficies - AUPA 5");
  }

  superficies: Superficie[] =  [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit() {
   this.getSuperficies();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
      language:{
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ superficies",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ superficies",
        infoEmpty: "Ningúna superficies por mostrar",
        loadingRecords: "Cargando superficies...",
        zeroRecords: "No se encontraron superficies registradas",
        emptyTable: "No hay datos de superficies disponibles",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
      },
      ordering: false,
      lengthMenu: [5, 10, 20, 50, 100]
    };
  }

  getSuperficies(){
    this.superfocieService.getSuperficies()
      .subscribe(
        res => {
          this.superficies = res;
          this.dtTrigger.next();
        },
        err => console.log(err)
      )
  }

  deleteSuperficie(id_sup){
    this.superfocieService.deleteSuperficie(id_sup)
      .subscribe(
        res => {
          this.toastr.success('Superficie eliminada correctamente');
          this.dtTrigger.unsubscribe();
          this.getSuperficies();
        },
        err => {
          this.toastr.error('No se ha podido eliminar el registro de superficie')
        }
      )
  }

  //paginación

}
