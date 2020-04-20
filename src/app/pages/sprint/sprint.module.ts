import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStoryPageComponent } from './edit-sprint-page/edit-story-page.component';
import { AddSprintPageComponent } from './add-sprint-page/add-sprint-page.component';
import { SprintsPageComponent } from './sprints-page/sprints-page.component';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const sprintRoutes: Routes = [{
  path: '',
  component: SprintsPageComponent
}];

@NgModule({
  entryComponents: [AddSprintPageComponent],
  declarations: [EditStoryPageComponent, AddSprintPageComponent, SprintsPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(sprintRoutes)
  ],
  exports: [EditStoryPageComponent, AddSprintPageComponent, SprintsPageComponent]
})
export class SprintModule { }
