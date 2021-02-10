import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  BASE_URL:string ='https://stormy-gorge-53468.herokuapp.com/api';
  constructor(private httpClient:HttpClient, ) { }
  
  getEmpleados(): Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.BASE_URL}/user`); 
  }
  getEmpleado(id_empleado:string): Observable<Empleado>{    
    return this.httpClient.get<Empleado>(`${this.BASE_URL}/user/${id_empleado}`); 
  }
  createEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.httpClient.post<Empleado>(`${this.BASE_URL}/user`, empleado); 
  }
  updateEmpleado(id_empleado: string, empleado: Empleado): Observable<Empleado>{
    return this.httpClient.put<Empleado>(`${this.BASE_URL}/user/${id_empleado}`, empleado);
  }
  deleteEmpleado(id_empleado): Observable<Empleado>{
    return this.httpClient.delete<Empleado>(`${this.BASE_URL}/user/${id_empleado}`);
  }
  editarEmpleado(): Observable<Empleado>{  
    let id = localStorage.getItem('id');  
    return this.httpClient.get<Empleado>(`${this.BASE_URL}/user/${id}`); 
  }
  misDatos(): Observable<Empleado>{
    let id = localStorage.getItem('id');  
    return this.httpClient.get<Empleado>(`${this.BASE_URL}/user/${id}`); 
  }
  updateDatos(empleado: Empleado): Observable<Empleado>{
    let id_empleado = localStorage.getItem('id');
    return this.httpClient.put<Empleado>(`${this.BASE_URL}/user/${id_empleado}`, empleado);
  }
  updateDatosNopass(empleado: Empleado): Observable<Empleado>{
    let id_empleado = localStorage.getItem('id');
    return this.httpClient.put<Empleado>(`${this.BASE_URL}/user/nopass/${id_empleado}`, empleado);
  }
}
