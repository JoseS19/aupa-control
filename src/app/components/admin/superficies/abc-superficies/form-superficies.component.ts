//import * as $ from 'jquery';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Title }  from '@angular/platform-browser';

import { Superficie } from '../../../../models/superficie';
import { SuperficieService } from '../../../../services/superficie.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { UsuarioService } from '../../../../services/usuario.service';
import { UsuarioAUPA } from '../../../../models/usuario-aupa';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Validators } from '@angular/forms';
declare let $: any;

@Component({
  templateUrl: './form-superficies.component.html',
  styleUrls: ['./form-superficies.component.css']
})
export class FormSuperficieComponent{

  constructor(
    private superficieService: SuperficieService, 
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private title: Title
  ){
    this.title.setTitle("Control de Superficies - AUPA 5");
  }
  
  superficies: Superficie[] =  [];
  usuarios_aupa: UsuarioAUPA[] =  [];
  editando: boolean = false;
  boton:string = "";
  encabezado:string = "";
  valor2: number;
  superficie: Superficie = {
    id_superficie: null,
    lote: null,
    id_usuario: null,
    area: null,
    coords: null,
    seccion: null,
  }

  ngOnInit() { 
    //Llenado de select
    const params = this.activatedRoute.snapshot.params;
    const edit = this.router.url.includes('/editar/');

    if(edit){
      this.encabezado = 'Editar información de la Superficie';
      this.boton = 'Guardar cambios';
      this.superficieService.getSuperficie(params.id)
      .subscribe(
        res=>{
          this.superficie = res;
          this.editando = true;
        },
        err=>{
          this.toastr.error('No se ha podido obtener los datos de la superficie');
          this.router.navigate(['/superficies']);
        }
      )
    }else{
      this.encabezado = 'Agregar a registro de superficies';
      this.boton = 'Añadir superficie';
    }  

    this.usuarioService.getUsuarios()
    .subscribe(
      res => {
        this.usuarios_aupa = res;
      },
      err => console.log(err)
    )  

    $(document).ready(function() {
        $('#buscador-select').select2({
          placeholder: 'Selecciona el usuario propietario'
        });
    });

    this.valor2 = $('#buscador-select').on("change", function(){
      this.valor2 = ($(this).val());
      this.superficie.id_usuario = this.valor2;
      console.log("Dentro: "+this.superficie.id_usuario);

    });
  }

  submitSuperficie(){
    console.log("Fuera: "+this.superficie.id_usuario);
    this.superficieService.createSuperficie(this.superficie).subscribe(
      res=> {          
          this.toastr.success('Superficie agregada correctamente');
          //this.router.navigate(['/usuarios']);
        },
      err => {
        this.toastr.error('No se ha podido agregar la superficie');
      }
    )
  }

  updateSuperficie(){
    this.superficieService.updateSuperficie(this.superficie.id_superficie.toString(), this.superficie)
    .subscribe(
      res=>{
        this.toastr.success('Superficie actualizada correctamente');
        this.router.navigate(['/superficies']);
      },
      err=>{
        console.log(err);
        this.toastr.error('No se han podido actualizar los datos de la superficie');
      }
    )
  }
  
}
