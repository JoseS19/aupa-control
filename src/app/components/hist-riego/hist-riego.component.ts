import * as $ from 'jquery';
import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Title }  from '@angular/platform-browser';

import { HistorialRiego } from '../../models/historialRiego';
import { HistRiegoService } from '../../services/histRiego.service'
import { Router, ActivatedRoute } from '@angular/router';
import { RiegoService } from '../../services/riego.service';

@Component({
  templateUrl: './hist-riego.component.html',
  styleUrls: ['./hist-riego.component.css']
})
export class HistRiegosComponent{

  constructor(private histRiegoService: HistRiegoService, private router:Router, private activatedRoute:ActivatedRoute, private toastr: ToastrService, private riegoService: RiegoService, private title: Title){
    this.title.setTitle("Historial de riegos - AUPA 5");
  }

  historial: HistorialRiego[] =  [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  id_riego: string;
  disponible: number;
  total: number;

  ngOnInit() {
    this.id_riego = this.activatedRoute.snapshot.paramMap.get('id_riego');
    this.getHistRiegos(this.id_riego);

    this.riegoService.getRiego(this.id_riego).subscribe(
      res=>{
        this.disponible = res.restante;
        this.total = res.total;
      }
    )

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
      language:{
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ riegos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ riegos",
        infoEmpty: "Ningún registro de riego por mostrar",
        loadingRecords: "Cargando riegos...",
        zeroRecords: "No se encontraron registros de riego",
        emptyTable: "No hay datos de riego",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
      },
      ordering: true,
      lengthMenu: [5, 10, 15, 20]
    };
  }

  getHistRiegos(id_riego){
    this.histRiegoService.getHistRiegos(id_riego)
      .subscribe(
        res => {
          this.historial = res;
          this.dtTrigger.next();
        },
        err => console.log(err)
      )
  }

  deleteHistRiego(id_historial){
    this.histRiegoService.deleteRiego(id_historial)
      .subscribe(
        res => {
          this.toastr.success('Historial eliminado correctamente');
          this.dtTrigger.unsubscribe();
          this.getHistRiegos(this.id_riego);
          this.ngOnInit();
        },
        err => {
          this.toastr.error('No se ha podido eliminar el historial de riego')
        }
      )
  }
}
