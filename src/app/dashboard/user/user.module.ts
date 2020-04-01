import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page/users-page.component';
import { AddUserPageComponent } from './add-user-page/add-user-page.component';
import { EditUserPageComponent } from './edit-user-page/edit-user-page.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [UsersPageComponent, AddUserPageComponent, EditUserPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [UsersPageComponent, AddUserPageComponent, EditUserPageComponent, SharedModule]
})
export class UserModule { }
