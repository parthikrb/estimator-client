import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FibonacciTileComponent } from './shared/components/fibonacci-tile/fibonacci-tile.component';


const routes: Routes = [{
  path: '',
  component: FibonacciTileComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
