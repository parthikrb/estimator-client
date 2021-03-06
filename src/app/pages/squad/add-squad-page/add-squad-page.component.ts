import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SquadService } from 'src/app/services/squad.service';
import { Squad } from 'src/app/entities/squad';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-squad-page',
  templateUrl: './add-squad-page.component.html',
  styleUrls: ['./add-squad-page.component.scss']
})
export class AddSquadPageComponent implements OnInit {
  addSquadForm: FormGroup;
  addCheckBox = false;
  squads$: Observable<Squad[]>
  _data: any;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<AddSquadPageComponent>,
    private formBuilder: FormBuilder,
    private squadService: SquadService
  ) {
    this._data = data;
    console.log('Add data', this._data)
    this.squads$ = this.squadService.entities$;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addSquadForm = this.formBuilder.group({
      squadname: [null, Validators.required],
      accessCode: [this.randomString(8, 'A#')],
      posm: [null, Validators.required]
    });
  }

  get posm() {
    return this.addSquadForm.get('posm') as FormControl;
  }

  addSquad(value: Squad) {
    console.log('Add Squad', value);
    this.squadService.add(value);
    if (!this.addCheckBox) {
      this.bottomSheetRef.dismiss();
    }
  }

  randomString(length: number, chars: string) {
    let mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    let result = '';
    for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
  }

}
