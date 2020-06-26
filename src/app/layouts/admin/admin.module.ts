import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AlertModule } from 'src/app/alert/alert.module';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    AlertModule
  ],exports: [
    AdminComponent,
    DashboardComponent
  ]
})
export class AdminModule { }
