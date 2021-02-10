import * as $ from 'jquery';
import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { Empleado } from '../../../models/empleado';
import { EmpleadoService } from '../../../services/empleado.service'
import { Router } from '@angular/router';
import { Title }  from '@angular/platform-browser';

@Component({
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent{

  constructor(private empleadoService: EmpleadoService, private router:Router, private toastr: ToastrService, private title: Title){
    this.title.setTitle("Empleados - AUPA 5");
  }

  empleados: Empleado[] =  [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.getEmpleados();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
      language:{
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ empleados",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ empleados",
        infoEmpty: "Ningún empleado por mostrar",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron empleados",
        emptyTable: "No hay datos disponibles en la tabla",
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

  getEmpleados(){
    this.empleadoService.getEmpleados()
      .subscribe(
        res => {
          this.empleados = res;
          this.dtTrigger.next();
        },
        err => console.log(err)
      )
  }

  deleteEmpleado(id_empleado){
    this.empleadoService.deleteEmpleado(id_empleado)
      .subscribe(
        res => {
          this.toastr.success('Empleado eliminado correctamente');
          this.dtTrigger.unsubscribe();
          this.getEmpleados();
        },
        err => {
          this.toastr.error('No se ha podido eliminar el empleado')
        }
      )
  }

}
