import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotePageComponent } from './vote-page/vote-page.component';
import { SharedModule } from '../shared/shared.module';
import { SquadModule } from './squad/squad.module';
import { SprintModule } from './sprint/sprint.module';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VotePageComponent],
  imports: [
    CommonModule,
    SquadModule,
    SprintModule,
    UserModule,
    SharedModule,
    DashboardModule
  ],
  exports: [SharedModule]
})
export class PagesModule { }
