//import * as $ from 'jquery';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Title }  from '@angular/platform-browser';

import { HistorialRiego } from '../../../models/historialRiego';
import { HistRiegoService } from '../../../services/histRiego.service'
import { Router, ActivatedRoute } from '@angular/router';
import { RiegoService } from '../../../services/riego.service';
import { UsuarioAUPA } from '../../../models/usuario-aupa';
import { Superficie } from '../../../models/superficie';
declare let $: any;

@Component({
  templateUrl: './form-hist-riego.component.html',
  styleUrls: ['./form-hist-riego.component.css']
})
export class FormHistRiegoComponent{

  constructor(
    private histRiegoService: HistRiegoService, 
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private riegoService: RiegoService,
    private title: Title
  ){
    this.title.setTitle("Historial de riegos - AUPA 5");
  }
  
  usuarios_aupa: UsuarioAUPA[] =  [];
  superficies: Superficie[] =  [];
  editando: boolean = false;
  boton:string = "";
  encabezado:string = "";
  registroGasto: HistorialRiego= {
    gasto: null,
    fecha: new Date(),
    id_riego: null,
  };
  gasto_sin_act: number;
  disponible: number;
  total: number;
  gastar: number;

  ngOnInit() { 
    const params = this.activatedRoute.snapshot.params;
    const edit = this.router.url.includes('/editar/');
    this.registroGasto.id_riego = params.id_riego;

    this.riegoService.getRiego(params.id_riego).subscribe(
      res=>{
        this.disponible = res.restante;
        this.total = res.total;
      }
    )

    if(edit){
      this.encabezado = 'Editar información de registro de riego';
      this.boton = 'Guardar cambios';
      this.histRiegoService.getGastoRiego(params.id_historial)
      .subscribe(
        res=>{
          this.registroGasto = res;
          this.gasto_sin_act = +this.registroGasto.gasto;
          this.editando = true;
        },
        err=>{
          this.toastr.error('No se han podido obtener los datos del registro de riego');
          this.router.navigate(['/riego/historial/',this.registroGasto.id_riego]);
        }
      )
    }else{
      this.encabezado = 'Agregar a gasto de riego';
      this.boton = 'Añadir gasto';
    }  

      $(document).ready(function() {
        $('#buscador-select').select2({
          placeholder: 'Selecciona el terreno'
        });
    });
  }

  submitRiego(){
    let resultado = this.validar();
    if(resultado>=0){
      this.histRiegoService.createRiego(this.registroGasto).subscribe(
        res=> {          
            this.toastr.success('Registro de gasto agregado correctamente');
            this.ngOnInit();
          },
        err => {
          this.toastr.error('No se ha podido agregar el gasto de riego');
        }
      )
    }else{
      this.toastr.error('Millares disponibles insuficientes');
    }
  }

  updateRiego(){
    let resultado = this.validar();
    if(resultado>=0){
      this.histRiegoService.updateRiego(this.registroGasto.id_historial.toString(), this.registroGasto)
      .subscribe(
        res=>{
          this.toastr.success('Registro de riego actualizado correctamente');
          this.router.navigate(['/riego/historial/',this.registroGasto.id_riego]);
        },
        err=>{
          console.log(err);
          this.toastr.error('No se han podido actualizar los datos del registro de riego');
        }
      )
    }else{
      this.toastr.error('Millares disponibles insuficientes');
    }
  }

  validar(){
    this.gastar = +this.registroGasto.gasto;
    if(this.editando){
      this.gastar = this.gastar - this.gasto_sin_act;
    }
    let resultado = this.disponible - this.gastar;
    return resultado;
  }

}
