import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { AuthGuard } from './guards/auth.guard';
import { JoinPageComponent } from './shared/components/join-page/join-page.component';

const routes: Routes = [{
  path: '',
  component: JoinPageComponent
}, {
  path: 'vote',
  component: VotePageComponent,
  canActivate: [AuthGuard]
}, {
  path: 'admin',
  loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
}, {
  path: 'squad',
  loadChildren: './pages/squad/squad.module#SquadModule'
}, {
  path: 'sprint',
  loadChildren: './pages/sprint/sprint.module#SprintModule'
}, {
  path: 'user',
  loadChildren: './pages/user/user.module#UserModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
