import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStoryPageComponent } from './edit-sprint-page/edit-story-page.component';
import { AddStoryPageComponent } from './add-sprint-page/add-story-page.component';
import { SprintsPageComponent } from './sprints-page/sprints-page.component';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const storyRoutes: Routes = [{
  path: '',
  component: SprintsPageComponent
}];

@NgModule({
  declarations: [EditStoryPageComponent, AddStoryPageComponent, SprintsPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(storyRoutes)
  ],
  exports: [EditStoryPageComponent, AddStoryPageComponent, SprintsPageComponent]
})
export class SprintModule { }
