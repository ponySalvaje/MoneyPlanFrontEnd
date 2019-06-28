import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { EditarSubscripcionComponent } from './editar-subscripcion/editar-subscripcion.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes
    },
    { path: 'editar-categoria', component: EditarCategoriaComponent},
    { path: 'editar-subscripcion', component: EditarSubscripcionComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})

export class AppRoutingModule {}
