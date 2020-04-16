import { Component, OnInit } from '@angular/core';
import { AddUserPageComponent } from '../../user/add-user-page/add-user-page.component';
import { BottomSheetHelper } from '../../../helpers/bottomSheetHelper';


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(
    private bottomSheet: BottomSheetHelper
  ) { }

  ngOnInit() {
  }

  openAddUser() {
    this.bottomSheet.openBottomSheet(AddUserPageComponent);
  }

}
