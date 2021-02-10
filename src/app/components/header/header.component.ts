import { Component } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ab-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService){}

  sesion:boolean = false;
  admin:boolean;
  ngOninit(){
    if(localStorage.getItem('admin') == '1'){
      this.admin = true;
    }
    
    const token = localStorage.getItem('token');
    if(token != null){
      this.sesion = true;
    }else{
      this.sesion = false;
    }
  }

  ngDoCheck(){
    if(localStorage.getItem('admin') == '1'){
      this.admin = true;
    }
    const token = localStorage.getItem('token');
    if(token != null){
      this.sesion = true;
    }else{
      this.sesion = false;
    }
  }

  onLogout(){
    const token = localStorage.getItem('token');
    this.authService.logoutUser().subscribe(
      res=> {
        this.router.navigate(['/login']);
        localStorage.clear();
      },
      err => {
        this.router.navigate(['/login']);
        localStorage.clear();
      })
  }
}