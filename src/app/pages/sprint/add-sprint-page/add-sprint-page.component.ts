import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Squad } from 'src/app/entities/squad';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Sprint } from '../../../entities/sprint';
import { SprintService } from '../../../services/sprint.service';
import { startWith, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-add-sprint-page',
  templateUrl: './add-sprint-page.component.html',
  styleUrls: ['./add-sprint-page.component.scss']
})
export class AddSprintPageComponent implements OnInit {

  addSprintForm: FormGroup;
  addCheckBox: false;
  filteredSquads: Observable<Squad[]>;

  allSquads: any[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<AddSprintPageComponent>,
    private formBuilder: FormBuilder,
    private sprintService: SprintService
  ) {

  }

  ngOnInit() {

    this.data.squads.subscribe(
      squad => {
        if (squad.length > 0) {
          this.allSquads.push(squad);
        }
      }
    );

    this.createForm();
    this.filteredSquads = this.getFilteredValue(this.squad) as Observable<Squad[]>
  }

  createForm() {
    this.addSprintForm = this.formBuilder.group({
      squad: [null, Validators.required],
      sprintname: [null, Validators.required],
      devCapacity: [0, Validators.required],
      qaCapacity: [0, Validators.required],
      poCapacity: [0, Validators.required],
      baCapacity: [0, Validators.required]
    });
  }

  get squad() {
    return this.addSprintForm.get('squad') as FormControl;
  }

  addSprint(value: Sprint) {
    this.sprintService.add(value);
    this.addSprintForm.reset();

    if (!this.addCheckBox) this.bottomSheetRef.dismiss();
  }

  private getFilteredValue(control: FormControl) {
    return control.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.allSquads.slice())
      )
  }

  private _filter(value) {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.squadname.toLowerCase();
    const _allSquads: any = [...this.allSquads][0];
    return _allSquads.filter(
      squad => squad.squadname.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(squad: Squad): string {
    return squad && squad.squadname ? `${squad.squadname}` : '';
  }

}
