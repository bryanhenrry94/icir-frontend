import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//MODULOS
import { AdminModule } from './layouts/admin/admin.module';
import { AuthModule } from './auth/auth.module';

//GUARD
import { AuthGuard } from './guards/auth.guard';

//SERVICES
import { TokenInterceptorService } from './services/token-interceptor.service';

//ADICIONALES
import { FlexLayoutModule } from '@angular/flex-layout';

//ANGULAR MATERIAL COMPONENTES
import {MatSidenavContainer} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

//COMPONENTES
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { IglesiaCreateComponent } from './modules/general/iglesia/iglesia-create/iglesia-create.component';
import { IglesiaListComponent } from './modules/general/iglesia/iglesia-list/iglesia-list.component';
import { IglesiaDetailComponent } from './modules/general/iglesia/iglesia-detail/iglesia-detail.component';
import { CajaCreateComponent } from './modules/tesoreria/caja/caja-create/caja-create.component';
import { CajaDetailComponent } from './modules/tesoreria/caja/caja-detail/caja-detail.component';
import { CajaListComponent } from './modules/tesoreria/caja/caja-list/caja-list.component';
import { UsuarioCreateComponent } from './modules/seguridad/usuario/usuario-create/usuario-create.component';
import { UsuarioListComponent } from './modules/seguridad/usuario/usuario-list/usuario-list.component';
import { UsuarioDetailComponent } from './modules/seguridad/usuario/usuario-detail/usuario-detail.component';
import { PersonaDetailComponent } from './modules/general/persona/persona-detail/persona-detail.component';
import { PersonaListComponent } from './modules/general/persona/persona-list/persona-list.component';
import { PersonaCreateComponent } from './modules/general/persona/persona-create/persona-create.component';
import { TipoMovimientoCreateComponent } from './modules/tesoreria/tipo_movimiento/tipo-movimiento-create/tipo-movimiento-create.component';
import { TipoMovimientoDetailComponent } from './modules/tesoreria/tipo_movimiento/tipo-movimiento-detail/tipo-movimiento-detail.component';
import { TipoMovimientoListComponent } from './modules/tesoreria/tipo_movimiento/tipo-movimiento-list/tipo-movimiento-list.component';
import { MovimientoCajaCreateComponent } from './modules/tesoreria/movimiento_caja/movimiento-caja-create/movimiento-caja-create.component';
import { MovimientoCajaDetailComponent } from './modules/tesoreria/movimiento_caja/movimiento-caja-detail/movimiento-caja-detail.component';
import { MovimientoCajaListComponent } from './modules/tesoreria/movimiento_caja/movimiento-caja-list/movimiento-caja-list.component';
import { MatNativeDateModule } from '@angular/material/core';

import { CustomHttpInterceptor } from './services/http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuarioCreateComponent,
    UsuarioListComponent,
    UsuarioDetailComponent,
    IglesiaCreateComponent,
    IglesiaListComponent,
    IglesiaDetailComponent,
    CajaCreateComponent,
    CajaDetailComponent,
    CajaListComponent,
    PersonaCreateComponent,
    PersonaDetailComponent,
    PersonaListComponent,
    TipoMovimientoCreateComponent,
    TipoMovimientoDetailComponent,
    TipoMovimientoListComponent,
    MovimientoCajaCreateComponent,
    MovimientoCajaDetailComponent,
    MovimientoCajaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    HttpClientModule,
    FlexLayoutModule,
    AdminModule,
    AuthModule
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    MatSidenavContainer,
    { provide: MatDialogRef, useValue: null },
	  { provide: MAT_DIALOG_DATA, useValue: null },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
