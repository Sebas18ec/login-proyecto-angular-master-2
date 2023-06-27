import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InsertarComponent } from './insertar/insertar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FilterPipe } from './pipes/filter.pipe';
import { EditarComponent } from './editar/editar.component';
import { MovimientoPlanillaComponent } from './movimiento-planilla/movimiento-planilla.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from './auth.guard';
import { CentroCostosComponent } from './centro-costos/centro-costos.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { TipoTrabajadorComponent } from './tipo-trabajador/tipo-trabajador.component';
import { EstadoTrabajadorComponent } from './estado-trabajador/estado-trabajador.component';
import { TipoContratoComponent } from './tipo-contrato/tipo-contrato.component';
import { TipoCeseComponent } from './tipo-cese/tipo-cese.component';
import { EstadoCivilComponent } from './estado-civil/estado-civil.component';
import { TipoCuentaComponent } from './tipo-cuenta/tipo-cuenta.component';
import { GeneroComponent } from './genero/genero.component';
import { ReingresoComponent } from './reingreso/reingreso.component';
import { TipoOperacionComponent } from './tipo-operacion/tipo-operacion.component';
import { MovimientoExcepcion1y2Component } from './movimiento-excepcion1y2/movimiento-excepcion1y2.component';
import { MovimientoExcepcion3Component } from './movimiento-excepcion3/movimiento-excepcion3.component';
import { AfectaIessComponent } from './afecta-iess/afecta-iess.component';
import { AfectaImpRentaComponent } from './afecta-imp-renta/afecta-imp-renta.component';
// Importa el módulo ModalModule desde ngx-bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
import { NivelSalarialComponent } from './nivel-salarial/nivel-salarial.component';
import { CategoriaOcupacionalComponent } from './categoria-ocupacional/categoria-ocupacional.component';
import { FondoReservaComponent } from './fondo-reserva/fondo-reserva.component';
import { DecimosComponent } from './decimos/decimos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InsertarComponent,
    BusquedaComponent,
    FilterPipe,
    EditarComponent,
    MovimientoPlanillaComponent,
    CentroCostosComponent,
    TrabajadorComponent,
    TipoTrabajadorComponent,
    EstadoTrabajadorComponent,
    TipoContratoComponent,
    TipoCeseComponent,
    EstadoCivilComponent,
    TipoCuentaComponent,
    GeneroComponent,
    ReingresoComponent,
    TipoOperacionComponent,
    MovimientoExcepcion1y2Component,
    MovimientoExcepcion3Component,
    AfectaIessComponent,
    AfectaImpRentaComponent,
    NivelSalarialComponent,
    CategoriaOcupacionalComponent,
    FondoReservaComponent,
    DecimosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }