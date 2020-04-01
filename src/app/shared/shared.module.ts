import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FibonacciTileComponent } from './components/fibonacci-tile/fibonacci-tile.component';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';

const components = [FibonacciTileComponent, HeaderComponent, SearchComponent];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [ReactiveFormsModule, MaterialModule, components]
})
export class SharedModule { }
