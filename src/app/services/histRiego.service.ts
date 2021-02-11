import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { HistorialRiego } from '../models/historialRiego';

@Injectable({
  providedIn: 'root'
})
export class HistRiegoService {

  BASE_URL:string ='https://thawing-taiga-33568.herokuapp.com/api/auth';   //Api2
  //BASE_URL:string ='http://127.0.0.1:8000/api';
  // BASE_URL:string ='https://stormy-gorge-53468.herokuapp.com/api';
  constructor(private httpClient:HttpClient, ) { }
  
  getHistRiegos(id_riego:string): Observable<HistorialRiego[]>{
    return this.httpClient.get<HistorialRiego[]>(`${this.BASE_URL}/riego/historial/${id_riego}`); 
  }
  getGastoRiego(id_riego:string): Observable<HistorialRiego>{    
    return this.httpClient.get<HistorialRiego>(`${this.BASE_URL}/riego/historial/registro/${id_riego}`); 
  }
  createRiego(riego: HistorialRiego): Observable<HistorialRiego>{
    return this.httpClient.post<HistorialRiego>(`${this.BASE_URL}/riego/historial`, riego); 
  }
  updateRiego(id_riego: string, riego: HistorialRiego): Observable<HistorialRiego>{
    return this.httpClient.put<HistorialRiego>(`${this.BASE_URL}/riego/historial/${id_riego}`, riego);
  }
  deleteRiego(id_riego): Observable<HistorialRiego>{
    return this.httpClient.delete<HistorialRiego>(`${this.BASE_URL}/riego/historial/${id_riego}`);
  }
}
