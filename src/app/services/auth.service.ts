import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { User } from "../models/user";
import { Router } from '@angular/router'
import { from } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router:Router) {}
  token = null;
  BASE_URL:string ='https://stormy-gorge-53468.herokuapp.com/api/auth';

  loginUser(user: User): Observable<any>{
    return this.httpClient.post<User>(`${this.BASE_URL}/login/`, user); 
  }

  refreshToken(){
    return this.httpClient.post<any>(`${this.BASE_URL}/refresh`, '');
  }

  logoutUser(){
    return this.httpClient.post<any>(`${this.BASE_URL}/logout`, '');
  }
}