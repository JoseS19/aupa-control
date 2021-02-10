import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { InterceptorService } from './interceptors/interceptor.service'
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {SideBarComponent} from './components/admin/side-bar/side-bar.component';
import {IniSesionComponent} from './components/ini-sesion/ini-sesion.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {MapaComponent} from './components/mapa/mapa.component';
import {CuentaComponent} from './components/cuenta/cuenta.component';
import {MenuComponent} from './components/menu/menu.component';
import {UsuariosComponent} from './components/admin/usuarios/usuarios.component';
import {EmpleadosComponent} from './components/admin/empleados/empleados.component';
import {FormUsuarioComponent} from './components/admin/usuarios/abc-usuarios/form-usuario.component';
import {FormEmpleadoComponent} from './components/admin/empleados/abc-empleados/form-empleado.component';
import {RiegosComponent} from './components/admin/riegos/riegos.component';
import {HistRiegosComponent} from './components/hist-riego/hist-riego.component';
import {FormHistRiegoComponent} from './components/hist-riego/abc-hist-riego/form-hist-riego.component';
import {FormRiegoComponent} from './components/admin/riegos/abc-riegos/form-riego.component';
import {SuperficiesComponent} from './components/admin/superficies/superficies.component';
import {FormSuperficieComponent} from './components/admin/superficies/abc-superficies/form-superficies.component';
import { CheckLoginGuard } from './guards/check-login.guard'
import { CheckAdminGuard } from './guards/check-admin.guard'
import {  } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    IniSesionComponent,
    InicioComponent,
    MapaComponent,
    MenuComponent,
    UsuariosComponent,
    FormUsuarioComponent,
    EmpleadosComponent,
    FormEmpleadoComponent,
    RiegosComponent,
    FormRiegoComponent,
    SuperficiesComponent,
    FormSuperficieComponent,
    HistRiegosComponent,
    FormHistRiegoComponent,
    CuentaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfQJFavLRMq70jLniFlFWlZL0U56sWCtc'
    }),
    RouterModule.forRoot([
      { path: "login", component: IniSesionComponent},
      { path: "mapa", component: MapaComponent, canActivate: [CheckLoginGuard] },
      { path: "menu", component: MenuComponent, canActivate: [CheckLoginGuard] },
      { path: "usuarios", component: UsuariosComponent, canActivate: [CheckAdminGuard, CheckLoginGuard] },
      { path: "usuario/añadir", component: FormUsuarioComponent, canActivate: [CheckAdminGuard, CheckLoginGuard] },
      { path: "usuario/editar/:id", component: FormUsuarioComponent, canActivate: [CheckAdminGuard, CheckLoginGuard] },
      { path: "empleados", component: EmpleadosComponent, canActivate: [CheckAdminGuard, CheckLoginGuard] },
      { path: "empleado/añadir", component: FormEmpleadoComponent, canActivate: [CheckAdminGuard, CheckLoginGuard] },
      { path: "empleado/editar/:id", component: FormEmpleadoComponent, canActivate: [CheckAdminGuard, CheckLoginGuard] },
      { path: "riegos", component: RiegosComponent, canActivate: [CheckLoginGuard] },
      { path: "riego/añadir", component: FormRiegoComponent, canActivate: [CheckLoginGuard] },
      { path: "riego/editar/:id", component: FormRiegoComponent, canActivate: [CheckLoginGuard] },
      { path: "riego/historial/:id_riego", component: HistRiegosComponent, canActivate: [CheckLoginGuard] },
      { path: "riego/historial/editar/:id_riego/:id_historial", component: FormHistRiegoComponent, canActivate: [CheckLoginGuard] },
      { path: "riego/historial/añadir/:id_riego", component: FormHistRiegoComponent, canActivate: [CheckLoginGuard] },
      { path: "superficies", component: SuperficiesComponent, canActivate: [CheckAdminGuard, CheckLoginGuard] },
      { path: "superficie/añadir", component: FormSuperficieComponent, canActivate: [CheckAdminGuard, CheckLoginGuard] },
      { path: "superficie/editar/:id", component: FormSuperficieComponent, canActivate: [CheckAdminGuard, CheckLoginGuard] },
      { path: "cuenta", component: CuentaComponent, canActivate: [CheckLoginGuard] },
      { path: "**", redirectTo: "/menu" }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}