import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SprintService } from '../../../services/sprint.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Sprint } from 'src/app/entities/sprint';
import { startWith, map } from 'rxjs/operators';
import { PollService } from '../../../services/poll.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  postStoryForm: FormGroup;
  sprints$: Observable<Sprint[]>;
  loading$: Observable<boolean>;
  filteredSprints: Observable<Sprint[]>;

  selectedSprint: string;
  allSprints: any[] = [];

  roomUsers: any[] = [];
  private roomUsersSubject = new BehaviorSubject<any>([]);
  roomUsers$ = this.roomUsersSubject.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private pollService: PollService
  ) {
    this.sprints$ = this.sprintService.entities$;
    this.loading$ = this.sprintService.loading$;
  }

  ngOnInit() {
    this.sprintService.getAll().subscribe(sprint => {
      if (sprint.length > 0) this.allSprints.push(sprint)
    });
    this.createPostStoryForm();

    this.filteredSprints = this.getFilteredValue(this.sprint) as Observable<Sprint[]>;

    /**
     * To get the users in all rooms
     */
    this.pollService.getRoomUsers()
      .subscribe(user => {
        this.roomUsers = user;
        if (this.selectedSprint) this.roomUsersSubject.next(this.roomUsers[this.selectedSprint]);
      });
  }

  createPostStoryForm() {
    this.postStoryForm = this.formBuilder.group({
      sprint: [null, Validators.required],
      storyname: [null, [Validators.required, Validators.minLength(4)]]
    })
  }

  get sprint() {
    return this.postStoryForm.get('sprint') as FormControl;
  }

  post(value) {
    console.log('value is, ', value);
    this.pollService.sendMessage(value.storyname, 'host', value.sprint.squad.accessCode);
  }

  private getFilteredValue(control: FormControl) {
    console.log('check ,', this.allSprints);
    return control.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.allSprints.slice())
      )
  }

  private _filter(value) {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.sprintname.toLowerCase();
    const _allSprints: any = [...this.allSprints][0];
    return _allSprints.filter(
      sprint => sprint.sprintname.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(sprint: Sprint): string {
    return sprint && sprint.sprintname ? `${sprint.sprintname} - ${sprint.squad['squadname']}` : '';
  }

  sprintChange(value) {
    console.log('Sprint Changed, ' + value);
    this.selectedSprint = value.squad.accessCode;
    this.roomUsersSubject.next(this.roomUsers[this.selectedSprint]);
  }

}
