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
//  BASE_URL:string ='https://stormy-gorge-53468.herokuapp.com/api/auth'; Api1
    BASE_URL:string ='https://thawing-taiga-33568.herokuapp.com/api/auth';   //Api2
  //BASE_URL:string ='http://127.0.0.1:8000/api/auth';

  loginUser(user: User): Observable<any>{
    return this.httpClient.post<User>(`${this.BASE_URL}/login`, user); 
  }

  refreshToken(){
    return this.httpClient.post<any>(`${this.BASE_URL}/refresh`, '');
  }

  logoutUser(){
    return this.httpClient.post<any>(`${this.BASE_URL}/logout`, '');
  }
}