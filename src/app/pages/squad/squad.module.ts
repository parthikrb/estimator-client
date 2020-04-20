import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSquadPageComponent } from './add-squad-page/add-squad-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SquadsPageComponent } from './squads-page/squads-page.component';
import { EditSquadPageComponent } from './edit-squad-page/edit-squad-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MatPoSmChipsComponent } from './mat-po-sm-chips/mat-po-sm-chips.component';

const squadRoutes: Routes = [{
  path: '',
  component: SquadsPageComponent,
}];


@NgModule({
  entryComponents: [AddSquadPageComponent],
  declarations: [AddSquadPageComponent, SquadsPageComponent, EditSquadPageComponent, MatPoSmChipsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(squadRoutes)
  ],
  exports: [AddSquadPageComponent, SquadsPageComponent, EditSquadPageComponent]
})
export class SquadModule { }
