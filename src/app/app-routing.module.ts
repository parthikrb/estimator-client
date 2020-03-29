import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { JoinPageComponent } from './pages/join-page/join-page.component';


const routes: Routes = [{
  path: '',
  component: JoinPageComponent
}, {
  path: 'vote',
  component: VotePageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
