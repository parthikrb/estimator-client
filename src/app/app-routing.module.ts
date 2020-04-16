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
  loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
}, {
  path: 'squad',
  loadChildren: () => import('./pages/squad/squad.module').then(m => m.SquadModule)
}, {
  path: 'sprint',
  loadChildren: () => import('./pages/sprint/sprint.module').then(m => m.SprintModule)
}, {
  path: 'user',
  loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
