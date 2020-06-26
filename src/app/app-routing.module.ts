import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component'
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { IglesiaListComponent } from './modules/general/iglesia/iglesia-list/iglesia-list.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { IglesiaCreateComponent } from './modules/general/iglesia/iglesia-create/iglesia-create.component';
import { IglesiaDetailComponent } from './modules/general/iglesia/iglesia-detail/iglesia-detail.component';
import { UsuarioListComponent } from './modules/seguridad/usuario/usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './modules/seguridad/usuario/usuario-create/usuario-create.component';
import { UsuarioDetailComponent } from './modules/seguridad/usuario/usuario-detail/usuario-detail.component';
import { CajaListComponent } from './modules/tesoreria/caja/caja-list/caja-list.component';
import { CajaCreateComponent } from './modules/tesoreria/caja/caja-create/caja-create.component';
import { CajaDetailComponent } from './modules/tesoreria/caja/caja-detail/caja-detail.component';
import { PersonaListComponent } from './modules/general/persona/persona-list/persona-list.component';
import { PersonaCreateComponent } from './modules/general/persona/persona-create/persona-create.component';
import { PersonaDetailComponent } from './modules/general/persona/persona-detail/persona-detail.component';
import { TipoMovimientoListComponent } from './modules/tesoreria/tipo_movimiento/tipo-movimiento-list/tipo-movimiento-list.component';
import { TipoMovimientoCreateComponent } from './modules/tesoreria/tipo_movimiento/tipo-movimiento-create/tipo-movimiento-create.component';
import { TipoMovimientoDetailComponent } from './modules/tesoreria/tipo_movimiento/tipo-movimiento-detail/tipo-movimiento-detail.component';
import { MovimientoCajaListComponent } from './modules/tesoreria/movimiento_caja/movimiento-caja-list/movimiento-caja-list.component';
import { MovimientoCajaCreateComponent } from './modules/tesoreria/movimiento_caja/movimiento-caja-create/movimiento-caja-create.component';
import { MovimientoCajaUpdateComponent } from './modules/tesoreria/movimiento_caja/movimiento-caja-update/movimiento-caja-update.component';
import { MovimientoCajaDetailComponent } from './modules/tesoreria/movimiento_caja/movimiento-caja-detail/movimiento-caja-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', component: UsuarioListComponent, canActivate: [AuthGuard] },
      { path: 'usuarios/add', component: UsuarioCreateComponent, canActivate: [AuthGuard]},
      { path: 'usuarios/add/:id', component: UsuarioCreateComponent, canActivate: [AuthGuard]},
      { path: 'usuarios/detail/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard]},
      { path: 'iglesias', component: IglesiaListComponent, canActivate: [AuthGuard]},
      { path: 'iglesias/add', component: IglesiaCreateComponent, canActivate: [AuthGuard]},
      { path: 'iglesias/add/:id', component: IglesiaCreateComponent, canActivate: [AuthGuard]},
      { path: 'iglesias/detail/:id', component: IglesiaDetailComponent, canActivate: [AuthGuard]},
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'cajas', component: CajaListComponent, canActivate: [AuthGuard]},
      { path: 'cajas/add', component: CajaCreateComponent, canActivate: [AuthGuard]},
      { path: 'cajas/add/:id', component: CajaCreateComponent, canActivate: [AuthGuard]},
      { path: 'cajas/detail/:id', component: CajaDetailComponent, canActivate: [AuthGuard]},
      { path: 'tipo_movimiento', component: TipoMovimientoListComponent, canActivate: [AuthGuard]},
      { path: 'tipo_movimiento/add', component: TipoMovimientoCreateComponent, canActivate: [AuthGuard]},
      { path: 'tipo_movimiento/add/:id', component: TipoMovimientoCreateComponent, canActivate: [AuthGuard]},
      { path: 'tipo_movimiento/detail/:id', component: TipoMovimientoDetailComponent, canActivate: [AuthGuard]},
      { path: 'movimiento_caja', component: MovimientoCajaListComponent, canActivate: [AuthGuard]},
      { path: 'movimiento_caja/add', component: MovimientoCajaCreateComponent, canActivate: [AuthGuard]},
      { path: 'movimiento_caja/update/:id', component: MovimientoCajaUpdateComponent, canActivate: [AuthGuard]},
      { path: 'movimiento_caja/detail/:id', component: MovimientoCajaDetailComponent, canActivate: [AuthGuard]},
      { path: 'personas', component: PersonaListComponent, canActivate: [AuthGuard]},
      { path: 'personas/add', component: PersonaCreateComponent, canActivate: [AuthGuard]},
      { path: 'personas/add/:id', component: PersonaCreateComponent, canActivate: [AuthGuard]},
      { path: 'personas/detail/:id', component: PersonaDetailComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
