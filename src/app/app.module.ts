import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { PanelesComponent } from './components/paneles/paneles.component';
import { InversoresComponent } from './components/inversores/inversores.component';
import { EstructurasComponent } from './components/estructuras/estructuras.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cuenta', component: CuentaComponent, canActivate: [AuthGuard] },
  { path: 'paneles', component: PanelesComponent, canActivate: [AuthGuard] },
  { path: 'inversores', component: InversoresComponent, canActivate: [AuthGuard] },
  { path: 'estructuras', component: EstructurasComponent, canActivate: [AuthGuard] },
  { path: 'cotizacion', component: CotizacionComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    CuentaComponent,
    PanelesComponent,
    InversoresComponent,
    EstructurasComponent,
    CotizacionComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
