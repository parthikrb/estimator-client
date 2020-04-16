import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss']
})
export class AddUserPageComponent implements OnInit {

  addUserForm: FormGroup;
  addCheckBox = false;
  users$: Observable<User[]>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AddUserPageComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.users$ = userService.entities$;
   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addUserForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
      isAdmin: [false]
    });
  }

  addUser(value: User) {
    console.log('Add User, ', value);

    this.userService.add(value);

    if (!this.addCheckBox) {
      this.bottomSheetRef.dismiss();
    }
  }



}
