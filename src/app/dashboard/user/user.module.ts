import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page/users-page.component';
import { AddUserPageComponent } from './add-user-page/add-user-page.component';
import { EditUserPageComponent } from './edit-user-page/edit-user-page.component';



@NgModule({
  declarations: [UsersPageComponent, AddUserPageComponent, EditUserPageComponent],
  imports: [
    CommonModule
  ],
  exports: [UsersPageComponent, AddUserPageComponent, EditUserPageComponent]
})
export class UserModule { }
