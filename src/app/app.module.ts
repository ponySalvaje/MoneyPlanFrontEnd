import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Módulos
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriaComponent } from './categoria/categoria.component';

import { TwoDigitDecimalNumberDirective } from './two-digits-number-validation.directive';

import { HttpClientModule } from '@angular/common/http';

// Services
import { CategoriapersonalizadaAPIService } from './services/categoriapersonalizada-api.service';
import { CategoriapredefinidaAPIService } from './services/categoriapredefinida-api.service';
import { ClienteAPIService } from './services/cliente-api.service';
import { MetaahorroAPIService } from './services/metaahorro-api.service';
import { RecompensaAPIService } from './services/recompensa-api.service';
import { TransaccionAPIService } from './services/transaccion-api.service';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CategoriaComponent,
    TwoDigitDecimalNumberDirective,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [CategoriapersonalizadaAPIService, CategoriapredefinidaAPIService, ClienteAPIService, 
    MetaahorroAPIService, RecompensaAPIService, TransaccionAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
