import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Riego } from '../models/riego';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {

  BASE_URL:string ='https://thawing-taiga-33568.herokuapp.com/api/auth';   //Api2
  //BASE_URL:string ='http://127.0.0.1:8000/api';
  // BASE_URL:string ='https://stormy-gorge-53468.herokuapp.com/api';
  constructor(private httpClient:HttpClient, ) { }
  
  getRiegos(): Observable<Riego[]>{
    return this.httpClient.get<Riego[]>(`${this.BASE_URL}/riegos`); 
  }
  getRiego(id_riego:string): Observable<Riego>{    
    return this.httpClient.get<Riego>(`${this.BASE_URL}/riegos/${id_riego}`); 
  }
  createRiego(riego: Riego): Observable<Riego>{
    return this.httpClient.post<Riego>(`${this.BASE_URL}/riegos`, riego); 
  }
  updateRiego(id_riego: string, riego: Riego): Observable<Riego>{
    return this.httpClient.put<Riego>(`${this.BASE_URL}/riegos/${id_riego}`, riego);
  }
  deleteRiego(id_riego): Observable<Riego>{
    return this.httpClient.delete<Riego>(`${this.BASE_URL}/riegos/${id_riego}`);
  }
  getRiegosSeccion(): Observable<Riego[]>{
    let seccion = localStorage.getItem('seccion');
    return this.httpClient.get<Riego[]>(`${this.BASE_URL}/riegos/seccion/${seccion}`); 
  }
  getRiegosInfo(): Observable<Riego[]>{
    return this.httpClient.get<Riego[]>(`${this.BASE_URL}/riegos/info/0`); 
  }

}
