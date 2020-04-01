import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStoryPageComponent } from './edit-story-page/edit-story-page.component';
import { AddStoryPageComponent } from './add-story-page/add-story-page.component';
import { StorysPageComponent } from './storys-page/storys-page.component';



@NgModule({
  declarations: [EditStoryPageComponent, AddStoryPageComponent, StorysPageComponent],
  imports: [
    CommonModule
  ],
  exports: [EditStoryPageComponent, AddStoryPageComponent, StorysPageComponent]
})
export class StoryModule { }
