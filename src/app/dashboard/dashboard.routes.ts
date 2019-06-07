import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-egreso', component: IngresoEgresoComponent },
    { path: 'categoria', component: CategoriaComponent },
    { path: 'configuracion', component: ConfiguracionComponent },
    { path: 'detalle', component: DetalleComponent }
];
