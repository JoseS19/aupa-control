import * as $ from 'jquery';
import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Title }  from '@angular/platform-browser';

import { UsuarioAUPA } from '../../../models/usuario-aupa';
import { UsuarioService } from '../../../services/usuario.service'
import { Router } from '@angular/router';

@Component({
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent{

  constructor(private usuarioService: UsuarioService, private router:Router, private toastr: ToastrService, private title: Title){
    this.title.setTitle("Usuarios - AUPA 5");
  }
  usuarios_aupa: UsuarioAUPA[] =  [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.getUsuarios();
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
      language:{
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ usuarios",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ usuarios",
        infoEmpty: "Ningún usuario por mostrar",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron usuarios",
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

  getUsuarios(){
    this.usuarioService.getUsuarios()
      .subscribe(
        res => {
          this.usuarios_aupa = res;
          this.dtTrigger.next();
        },
        err => console.log(err)
      )
  }

  deleteUsuario(num_cuenta){
    this.usuarioService.deleteUsuario(num_cuenta)
      .subscribe(
        res => {
          this.toastr.success('Usuario eliminado correctamente');
          this.dtTrigger.unsubscribe();
          this.getUsuarios();
        },
        err => {
          this.toastr.error('No se ha podido eliminar el usuario')
        }
      )
  }

  //paginación

}
