import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page/users-page.component';
import { AddUserPageComponent } from './add-user-page/add-user-page.component';
import { EditUserPageComponent } from './edit-user-page/edit-user-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetHelper } from 'src/app/helpers/bottomSheetHelper';
import { NgScrollbarModule } from 'ngx-scrollbar';

const userRoutes: Routes = [{
  path: '',
  component: UsersPageComponent
}];


@NgModule({
  entryComponents: [AddUserPageComponent],
  declarations: [UsersPageComponent, AddUserPageComponent, EditUserPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(userRoutes),
    NgScrollbarModule
  ],
  exports: [UsersPageComponent, AddUserPageComponent, EditUserPageComponent, SharedModule],

})
export class UserModule { }
