import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ENTER, COMMA} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete'
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/user';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-mat-po-sm-chips',
  templateUrl: './mat-po-sm-chips.component.html',
  styleUrls: ['./mat-po-sm-chips.component.scss']
})
export class MatPoSmChipsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  seperatorKeyCodes = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<User[]>;
  Users: any[] = [];

  @Input()
  form: FormGroup;

  @Input()
  data: any;

  allUsers: any[] = [];

  @ViewChild('userInput', { static: false }) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutoComplete: MatAutocomplete;

  constructor() {
    this.filteredUsers = this.userCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.allUsers.slice())
      );
  }

  ngOnInit(): void {
    this.data.users.subscribe(
      user => {
        console.log('users, ', user)
        if (user.length > 0) {
          this.allUsers.push(user);
        }
      });

  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutoComplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if (value) {
        this.Users.push(value);
      }

      if (input) {
        input.value = '';
      }

      this.userCtrl.setValue(null);

    }
  }

  remove(user, indx): void {
    this.Users.splice(indx, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.Users.push(event.option.value);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
    this.form.get('posm').setValue(this.Users);
  }

  private _filter(value) {

    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.firstname.toLowerCase();
    const _allUsers: any = [...this.allUsers][0]
    return _allUsers.filter(
      user => user.firstname.toLowerCase().indexOf(filterValue) === 0
    );

  }

}
