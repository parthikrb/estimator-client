import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FibonacciTileComponent } from './components/fibonacci-tile/fibonacci-tile.component';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { JoinPageComponent } from './components/join-page/join-page.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SprintStoryDetailsComponent } from './components/sprint-story-details/sprint-story-details.component';
import { ChartsModule } from 'ng2-charts';


const components = [SprintStoryDetailsComponent, FibonacciTileComponent, HeaderComponent, SearchComponent,
  JoinPageComponent, SidenavComponent];

@NgModule({
  declarations: [components, CopyClipboardDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    NgScrollbarModule,
    ChartsModule
  ],
  exports: [ReactiveFormsModule, FormsModule, MaterialModule, components, ChartsModule, CopyClipboardDirective, NgScrollbarModule]
})
export class SharedModule { }
