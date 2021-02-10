import { Component } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service'
import {User} from 'src/app/models/user'
import {SToken} from 'src/app/models/stoken'
import { Router } from '@angular/router';
import { Title }  from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  templateUrl: './ini-sesion.component.html',
  styleUrls: ['./ini-sesion.component.css']
})
export class IniSesionComponent{
  loginForm = new FormGroup({
  });

  constructor(private authService: AuthService, private router: Router, private title: Title){
      this.title.setTitle("Iniciar sesión - AUPA 5");
  }

  stoken: SToken = {}
  sesion: User = {
    num_tel: null,
    password: null      
  };
  fallo: boolean;

  ngOnInt(){
  }

  onLogin(){
    this.authService.loginUser(this.sesion).subscribe(
      res=> {          
        this.stoken = res;
        localStorage.setItem("token", res.token.original.access_token);
        localStorage.setItem("admin", res.user.original.admin);
        localStorage.setItem("seccion", res.user.original.seccion);
        localStorage.setItem("id", res.user.original.id);
        this.router.navigate(['menu'])
    },err => {
      this.fallo = true;
    })
  }

}
