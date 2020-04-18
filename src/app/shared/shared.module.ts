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



const components = [FibonacciTileComponent, HeaderComponent, SearchComponent, JoinPageComponent, SidenavComponent];

@NgModule({
  declarations: [components, CopyClipboardDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [ReactiveFormsModule, FormsModule, MaterialModule, components, CopyClipboardDirective]
})
export class SharedModule { }
