import * as $ from 'jquery';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title }  from '@angular/platform-browser';

@Component({
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent{

  constructor(
    private empleadoService: EmpleadoService, 
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ){
    this.title.setTitle("Mi cuenta");
  }
  divPass: boolean = false;
  botonPass: boolean = true;
  textBtn: string = 'Sí';
  empleado: Empleado= {
    nombre: '',
    ap: '',
    num_tel: '',
    seccion: '',
    password: '',
    admin: false
  };
  pass2: string;
  pass_valid: boolean;
  pass_ant: string;

  ngOnInit() { 
    this.empleadoService.misDatos()
    .subscribe(
      res=>{
        this.empleado = res;
      },
      err=>{
        this.toastr.error('No se han podido obtener los datos del empleado');
      }
    )
  }

  actualizarDatos(){
    if(this.divPass != false){
      if(this.pass2 != this.empleado.password){
        this.pass_valid = false;
        return;
      }else{
        this.empleadoService.updateDatos(this.empleado)
        .subscribe(
          res=>{
            this.toastr.success('Empleado actualizado correctamente');
            this.router.navigate(['menu']);
          },
          err=>{
            this.toastr.error('No se han podido actualizar los datos del empleado');
          }
        )
      }
    }else{
      this.empleadoService.updateDatosNopass(this.empleado)
      .subscribe(
        res=>{
          this.toastr.success('Empleado actualizado correctamente');
          this.router.navigate(['menu']);
        },
        err=>{
          this.toastr.error('No se han podido actualizar los datos del empleado');
        }
      )
    }
  }

  cambiarPass(){
    this.divPass = !this.divPass;
    this.botonPass = !this.botonPass;
    if(this.botonPass){
      this.textBtn = 'Sí' 
    }else{
      this.textBtn = 'No'
    }
  }
}
