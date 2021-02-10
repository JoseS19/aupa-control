import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    const admin = localStorage.getItem('admin');
    if(admin == '1'){
     // return true;
    }else{
      this.router.navigate(['/menu'])
      //return false;
    }
    return true;
  }
}
