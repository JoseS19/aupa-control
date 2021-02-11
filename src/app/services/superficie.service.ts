import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Superficie } from '../models/superficie';

@Injectable({
  providedIn: 'root'
})
export class SuperficieService {

  
  BASE_URL:string ='https://thawing-taiga-33568.herokuapp.com/api/auth';   //Api2
  //BASE_URL:string ='http://127.0.0.1:8000/api';
//  BASE_URL:string ='https://stormy-gorge-53468.herokuapp.com/api';
  constructor(private httpClient:HttpClient) { }
  
  getSuperficies(): Observable<Superficie[]>{
    return this.httpClient.get<Superficie[]>(`${this.BASE_URL}/superficies`);
  }
  getSuperficiesSeccion(): Observable<Superficie[]>{
    let seccion = localStorage.getItem('seccion');
    return this.httpClient.get<Superficie[]>(`${this.BASE_URL}/superficies/seccion/${seccion}`);
  }
  getSuperficie(id_superficie:string): Observable<Superficie>{    
    return this.httpClient.get<Superficie>(`${this.BASE_URL}/superficies/${id_superficie}`); 
  }
  createSuperficie(superficie: Superficie): Observable<Superficie>{
    return this.httpClient.post<Superficie>(`${this.BASE_URL}/superficies`, superficie); 
  }
  updateSuperficie(id_superficie: string, superficie: Superficie): Observable<Superficie>{
    return this.httpClient.put<Superficie>(`${this.BASE_URL}/superficies/${id_superficie}`, superficie);
  }
  deleteSuperficie(id_superficie): Observable<Superficie>{
    return this.httpClient.delete<Superficie>(`${this.BASE_URL}/superficies/${id_superficie}`);
  }
  getSuperficiesMapaRiego(): Observable<Superficie[]>{    
    return this.httpClient.get<Superficie[]>(`${this.BASE_URL}/superficies/mapa/0`); 
  }
  getSuperficiesMapaRiegoSeccion(): Observable<Superficie[]>{    
    let seccion = localStorage.getItem('seccion');
    return this.httpClient.get<Superficie[]>(`${this.BASE_URL}/superficies/mapa/seccion/${seccion}`); 
  }
  getSuperficiesSelect(): Observable<Superficie[]>{
    return this.httpClient.get<Superficie[]>(`${this.BASE_URL}/superficies/riego/0`); 
  }
}
