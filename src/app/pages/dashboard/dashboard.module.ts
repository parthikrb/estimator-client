import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';


const dashboardRoute: Routes = [{
  path: '',
  component: DashboardComponent
}];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoute),
    SharedModule
  ]
})
export class DashboardModule { }
