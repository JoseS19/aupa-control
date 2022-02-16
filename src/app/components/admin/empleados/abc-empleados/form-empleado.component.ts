import * as $ from 'jquery';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Empleado } from '../../../../models/empleado';
import { EmpleadoService } from '../../../../services/empleado.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title }  from '@angular/platform-browser';

@Component({
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent{

  constructor(
    private empleadoService: EmpleadoService, 
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ){
    this.title.setTitle("Control de Empleados - AUPA 5");
  }

  editando: boolean = false;
  opcion_admin: boolean = false;
  boton:string = "";
  encabezado:string = "";
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

  ngOnInit() { 
    const params = this.activatedRoute.snapshot.params;
    const edit = this.router.url.includes('/editar/');
    if(edit){
      this.encabezado = 'Editar información del empleado';
      this.boton = 'Guardar cambios';
      this.empleadoService.getEmpleado(params.id)
      .subscribe(
        res=>{
          this.empleado = res;
          this.editando = true;
        },
        err=>{
          this.toastr.error('No se han podido obtener los datos del empleado');
          this.router.navigate(['/empleados']);
        }
      )
    }else{
      this.encabezado = 'Agregar empleado';
      this.boton = 'Añadir empleado';
    }
    
  }

  submitEmpleado(){
    if(this.pass2 == this.empleado.password){
    this.empleadoService.createEmpleado(this.empleado).subscribe(
      res=> {          
          this.toastr.success('Empleado agregado correctamente');
          this.router.navigate(['/empleados']);
        },
      err => {
        this.toastr.error('No se ha podido agregar al empleado');
      }
    )
    }else{
      this.pass_valid = false;
    }
  }

  updateEmpleado(){
    if(this.divPass != false){
      if(this.pass2 != this.empleado.password){
        this.pass_valid = false;
        return;
      }else{
        this.empleadoService.updateDatos(this.empleado)
        .subscribe(
          res=>{
            this.toastr.success('Empleado actualizado correctamente');
            this.router.navigate(['/empleados']);
          },
          err=>{
            this.toastr.error('No se han podido actualizar los datos del empleado');
          }
        )
      }
    }else{
        console.log(this.empleado);
        this.empleado.password = null;
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
