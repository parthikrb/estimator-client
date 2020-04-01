import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AddSquadPageComponent } from './squad/add-squad-page/add-squad-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';
import { SquadModule } from './squad/squad.module';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';

const dashboardRoutes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},
{
  path: 'dashboard',
  component: AdminHomePageComponent,
  children: [
    {
      path: 'squads',
      component: AddSquadPageComponent,
      // loadChildren: './squad/squad.module#SquadModule',
      outlet: 'sidenav'
    }
  ]
}, ];

@NgModule({
  declarations: [AdminHomePageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(dashboardRoutes),
    SquadModule,
    UserModule,
    StoryModule
  ],
  exports: [RouterModule, AdminHomePageComponent]
})
export class DashboardModule { }
