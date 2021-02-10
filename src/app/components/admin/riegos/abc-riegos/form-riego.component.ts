//import * as $ from 'jquery';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Title }  from '@angular/platform-browser';

import { Riego } from '../../../../models/riego';
import { RiegoService } from '../../../../services/riego.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { SuperficieService } from '../../../../services/superficie.service';
import { UsuarioAUPA } from '../../../../models/usuario-aupa';
import { Superficie } from '../../../../models/superficie';
declare let $: any;

@Component({
  templateUrl: './form-riego.component.html',
  styleUrls: ['./form-riego.component.css']
})
export class FormRiegoComponent{

  constructor(
    private riegoService: RiegoService, 
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private superficieService: SuperficieService,
    private title: Title
  ){
    this.title.setTitle("Control de Riegos - AUPA 5");
  }
  
  usuarios_aupa: UsuarioAUPA[] =  [];
  superficies: Superficie[] =  [];
  editando: boolean = false;
  boton:string = "";
  encabezado:string = "";
  riego: Riego= {
    cultivo: '',
    id_superficie: null,
    inicio: new Date(),
    ultima_mod: new Date(),
    total: null,
    restante: null
  };

  ngOnInit() { 
    //Llenado de combo box
    let admin = localStorage.getItem('admin');
    if(admin == '0'){
      this.superficieService.getSuperficiesSeccion()
      .subscribe(
        res => {
          this.superficies = res;
        },
        err => {
          this.toastr.error('No se pudieron obtener las superficies disponibles')
          this.router.navigate(['/riegos']);
        }
      )  
    }else{
      this.superficieService.getSuperficiesSelect()
      .subscribe(
        res => {
          this.superficies = res;
        },
        err => {
          this.toastr.error('No se pudieron obtener las superficies disponibles')
          this.router.navigate(['/riegos']);
        }
      )  
    }
    
    const params = this.activatedRoute.snapshot.params;
    const edit = this.router.url.includes('/editar/');

    if(edit){
      this.encabezado = 'Editar información de riego';
      this.boton = 'Guardar cambios';
      this.riegoService.getRiego(params.id)
      .subscribe(
        res=>{
          this.riego = res;
          this.editando = true;
        },
        err=>{
          this.toastr.error('No se ha podido obtener los datos del riego');
          this.router.navigate(['/riegos']);
        }
      )
    }else{
      this.encabezado = 'Agregar a registro de riegos';
      this.boton = 'Añadir riego';
    }  

      $(document).ready(function() {
        $('#buscador-select').select2({
          placeholder: 'Selecciona el terreno'
        });
    });
  }

  submitRiego(){
    this.riego.ultima_mod = this.riego.inicio;
    this.riego.restante = this.riego.total;
    this.riegoService.createRiego(this.riego).subscribe(
      res=> {          
          this.toastr.success('Riego agregado correctamente');
          //this.router.navigate(['/usuarios']);
        },
      err => {
        this.toastr.error('No se ha podido agregar el riego');
      }
    )
  }

  updateRiego(){
    this.riego.ultima_mod = this.riego.inicio;
    this.riegoService.updateRiego(this.riego.id_riego.toString(), this.riego)
    .subscribe(
      res=>{
        this.toastr.success('Riego actualizado correctamente');
        this.router.navigate(['/riegos']);
      },
      err=>{
        console.log(err);
        this.toastr.error('No se han podido actualizar los datos del riego');
      }
    )
  }

}
