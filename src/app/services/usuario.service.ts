import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { UsuarioAUPA } from '../models/usuario-aupa';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL:string ='https://thawing-taiga-33568.herokuapp.com/api';   //Api2
  // BASE_URL:string ='https://stormy-gorge-53468.herokuapp.com/api';
  //BASE_URL:string ='http://127.0.0.1:8000/api';

  constructor(private httpClient:HttpClient, ) { }
  
  getUsuarios(): Observable<UsuarioAUPA[]>{
    return this.httpClient.get<UsuarioAUPA[]>(`${this.BASE_URL}/usuarios`); 
  }
  getUsuario(num_cuenta:string): Observable<UsuarioAUPA>{    
    return this.httpClient.get<UsuarioAUPA>(`${this.BASE_URL}/usuarios/${num_cuenta}`); 
  }
  createUsuario(usuario: UsuarioAUPA): Observable<UsuarioAUPA>{
    return this.httpClient.post<UsuarioAUPA>(`${this.BASE_URL}/usuarios`, usuario); 
  }
  updateUsuario(num_cuenta: string, usuario: UsuarioAUPA): Observable<UsuarioAUPA>{
    return this.httpClient.put<UsuarioAUPA>(`${this.BASE_URL}/usuarios/${num_cuenta}`, usuario);
  }
  deleteUsuario(num_cuenta): Observable<UsuarioAUPA>{
    return this.httpClient.delete<UsuarioAUPA>(`${this.BASE_URL}/usuarios/${num_cuenta}`);
  }
}
