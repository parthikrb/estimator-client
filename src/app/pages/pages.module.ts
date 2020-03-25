import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotePageComponent } from './vote-page/vote-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [VotePageComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [SharedModule]
})
export class PagesModule { }
