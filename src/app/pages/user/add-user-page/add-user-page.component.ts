import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss']
})
export class AddUserPageComponent implements OnInit {

  addUserForm: FormGroup;
  addCheckBox = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AddUserPageComponent>,
    private formBuilder: FormBuilder
  ) { }

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

  addUser(value) {
    console.log('Add User, ', value);

    if (!this.addCheckBox) {
      this.bottomSheetRef.dismiss();
    }
  }



}
