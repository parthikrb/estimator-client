import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UserTileComponent } from './user-tile/user-tile.component';


const dashboardRoute: Routes = [{
  path: '',
  component: DashboardComponent
}];

@NgModule({
  declarations: [DashboardComponent, UserTileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoute),
    SharedModule
  ]
})
export class DashboardModule { }
