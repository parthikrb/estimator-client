import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSquadPageComponent } from './add-squad-page/add-squad-page.component';
import { Routes } from '@angular/router';
import { SquadsPageComponent } from './squads-page/squads-page.component';
import { EditSquadPageComponent } from './edit-squad-page/edit-squad-page.component';
import { SharedModule } from '../../shared/shared.module';

const squadRoutes: Routes = [{
  path: '',
  redirectTo: '/squadsHome',
  pathMatch: 'full'
},
{
  path: 'squadsHome',
  component: AddSquadPageComponent,
}];


@NgModule({
  declarations: [AddSquadPageComponent, SquadsPageComponent, EditSquadPageComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AddSquadPageComponent, SquadsPageComponent, EditSquadPageComponent]
})
export class SquadModule { }
