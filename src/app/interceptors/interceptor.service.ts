import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token_u = localStorage.getItem('token');
    const headers = new HttpHeaders ({
      'Authorization': 'bearer ' + token_u,
      'Content-Type': 'application/json'
    });
    const reqclone = req.clone({
      headers
    })
    return next.handle(reqclone);
  }
}
