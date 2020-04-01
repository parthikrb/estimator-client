import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SquadModule } from './squad/squad.module';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';
import { SquadsPageComponent } from './squad/squads-page/squads-page.component';
import { UsersPageComponent } from './user/users-page/users-page.component';
import { StorysPageComponent } from './story/storys-page/storys-page.component';

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
      component: SquadsPageComponent,
      // loadChildren: './squad/squad.module#SquadModule',
      outlet: 'sidenav'
    },
    {
      path: 'users',
      component: UsersPageComponent,
      outlet: 'sidenav'
    },
    {
      path: 'stories',
      component: StorysPageComponent,
      outlet: 'sidenav'
    }
  ]
}, ];

@NgModule({
  declarations: [AdminHomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    SquadModule,
    UserModule,
    StoryModule
  ],
  exports: [RouterModule, AdminHomePageComponent]
})
export class DashboardModule { }
