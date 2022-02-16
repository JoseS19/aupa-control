import * as $ from 'jquery';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Title }  from '@angular/platform-browser';

import { UsuarioAUPA } from '../../../../models/usuario-aupa';
import { UsuarioService } from '../../../../services/usuario.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent{

  constructor(
    private usuarioService: UsuarioService, 
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
  ){
    this.title.setTitle("Control de usuarios - AUPA 5");
  }

  editando: boolean = false;
  boton:string = "";
  encabezado:string = "";
  usuario: UsuarioAUPA= {
    num_cuenta: '',
    nombre: '',
    ap: '',
    num_tel: '',
    rfc: '',
  };

  ngOnInit() { 
    const params = this.activatedRoute.snapshot.params;
    const edit = this.router.url.includes('/editar/');

    if(edit){
      this.encabezado = 'Editar información de usuario';
      this.boton = 'Guardar cambios';
      this.usuarioService.getUsuario(params.id)
      .subscribe(
        res=>{
          this.usuario = res;
          this.editando = true;
        },
        err=>{
          this.toastr.error('No se ha podido obtener al usuario');
          this.router.navigate(['/usuarios']);
        }
      )
    }else{
      this.encabezado = 'Agregar a padrón de usuarios';
      this.boton = 'Añadir usuario';
    }
    
  }

  submitUsuario(){
    this.usuarioService.createUsuario(this.usuario).subscribe(
      res=> {          
          this.toastr.success('Usuario agregado correctamente');
          this.router.navigate(['/usuarios']);
        },
      err => {
        this.toastr.error('No se ha podido agregar al usuario');
      }
    )
  }

  updateUsuario(){
    this.usuarioService.updateUsuario(this.usuario.id_usuario.toString(), this.usuario)
    .subscribe(
      res=>{
        this.toastr.success('Usuario actualizado correctamente');
        this.router.navigate(['/usuarios']);
      },
      err=>{
        console.log(err);
        this.toastr.error('No se han podido actualizar los datos del usuario');
      }
    )
  }

}
