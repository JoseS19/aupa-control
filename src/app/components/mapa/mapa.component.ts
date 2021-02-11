import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { Superficie, Coordenadas } from '../../models/superficie';
import { SuperficieService } from '../../services/superficie.service'
import { Title }  from '@angular/platform-browser';
import { from } from 'rxjs';
@Component({
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})
export class MapaComponent{

    constructor(private superficieService: SuperficieService, private toastr: ToastrService, private title: Title, private router:Router){
        this.lat = 26.279384;
        this.lng = -108.997228;
        this.zoom = 15;
        this.mapTypeId = 'hybrid';
        this.title.setTitle("Mapa - AUPA 5");
    }

    superficies: Superficie[] =  [];
    poligonos: Superficie[] =  [];
    superficiesRiego: Superficie[] =  [];
    lat: number;
    lng: number;
    zoom: number;
    mapTypeId: string;
    ngOnInit() {
        this.inicio();
    }

    inicio(){
        let isAdmin = localStorage.getItem('admin');
        if(isAdmin == '1'){
            this.getSuperficies();
        }else{
            this.getSuperficiesNoAdmin();
        }
    }

    getSuperficies(){
        this.superficieService.getSuperficies()
          .subscribe(
            res => {
              this.superficies = res;
              this.fromatear_coords(res);
            },
            err => {
                this.toastr.error('No se pudieron obtener los datos de las superficies');
                this.router.navigate(['menu'])
            }
        )

        this.superficieService.getSuperficiesMapaRiego()
        .subscribe(
            res => {
                this.superficiesRiego = res;
                this.unir();
            },
            err => this.toastr.error('No se pudieron obtener los datos de las superficies')
        )        
    }

    getSuperficiesNoAdmin(){
        this.superficieService.getSuperficiesSeccion()
          .subscribe(
            res => {
              this.superficies = res;
              this.fromatear_coords(res);
            },
            err => {
                this.toastr.error('No se pudieron obtener los datos de las superficies');
                this.router.navigate(['menu'])
            }
        )

        this.superficieService.getSuperficiesMapaRiegoSeccion()
        .subscribe(
            res => {
                this.superficiesRiego = res;
                this.unir();
            },
            err => this.toastr.error('No se pudieron obtener los datos de las superficies')
        )        
    }

    unir(){
        for(let i=0; i<this.superficies.length; i++){
            this.poligonos[i] = this.superficies[i];
            for(let x=0; x<this.superficiesRiego.length; x++){
                if(this.poligonos[i].id_superficie == this.superficiesRiego[x].id_superficie){
                    this.poligonos[i].total = this.superficiesRiego[x].total;
                    this.poligonos[i].restante = this.superficiesRiego[x].restante;
                    this.poligonos[i].id_riego = this.superficiesRiego[x].id_riego;
                }
            }
        }
    }

    fromatear_coords(respuesta){
        let coords_polig: string[] =  [];
        respuesta.forEach(sup => {
            let parte = sup.coords.split(' ');
            coords_polig.push(parte);
        });

        for(let i=0; i<coords_polig.length ;i++)
        {
            let todas: Array<number> = [];
            for(let k=0; k<coords_polig[i].length ;k++)
            {
                if (k % 2 == 0) //par
                {
                    let lat_sep = +coords_polig[i][k];
                    todas.push(lat_sep);
                }
                else
                {
                    let lng_sep_s = coords_polig[i][k];
                    if(lng_sep_s.includes(',')){
                        lng_sep_s = lng_sep_s.slice(0, -1);
                    }
                    let lng_sep = +lng_sep_s;
                    todas.push(lng_sep);
                }
            }

            let puntos: Array<Coordenadas> = [];

            for(let i=0; i<todas.length; i++){
                if (i % 2 != 0) //impar
                {
                    let coord: Coordenadas = {lat: todas[i-1], lng: todas[i]};
                    puntos.push(coord);
                }
            }
            this.superficies[i].poligono = puntos;
            let centro = this.centro_poligono(puntos, todas.length);
            this.superficies[i].centro = centro;
        }
    }

    centro_poligono(puntos: Coordenadas[], cant_puntos: number){
        let mayor: Coordenadas = {lat: puntos[0].lat, lng: puntos[0].lng};
        let menor: Coordenadas = {lat: puntos[0].lat, lng: puntos[0].lng};
        for(let i=0; i<puntos.length; i++){
            if(puntos[i].lat > mayor.lat) //Latiitud mayor
            {
                mayor.lat = puntos[i].lat;
            }

            if(puntos[i].lng > mayor.lng)   //Longitud mayor
            {
                mayor.lng = puntos[i].lng;
            }

            if(puntos[i].lat < menor.lat) //Latiitud menor
            {
                menor.lat = puntos[i].lat;
            }

            if(puntos[i].lng < menor.lng)   //Longitud menor
            {
                menor.lng = puntos[i].lng;
            }
        }
        var latitud_centro: number = mayor.lat + ((menor.lat - mayor.lat)/2);
        var longitud_centro: number = mayor.lng + ((menor.lng - mayor.lng)/2);
        let centro_poligono: Coordenadas = {lat: latitud_centro, lng:longitud_centro};
        return centro_poligono;
    }

}