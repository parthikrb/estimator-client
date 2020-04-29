import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SprintService } from '../../../services/sprint.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Sprint } from 'src/app/entities/sprint';
import { startWith, map, filter } from 'rxjs/operators';
import { PollService } from '../../../services/poll.service';
import { StoryService } from '../../../services/story.service';
import { Story } from 'src/app/entities/story';

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

  stories$: Observable<Story[]>;

  sprintStoriesSubject: BehaviorSubject<any>;
  sprintStories$: Observable<any>;
  storyLoading$: Observable<boolean>;
  sprintStoriesCache: Story[] = [];

  selectedSprint: string;
  allSprints: any[] = [];

  sprintName: string;
  isPolled: boolean;
  roomUsers: any[] = [];
  roomUsersVote: any[] = [];
  average: any = {};

  private roomUsersSubject = new BehaviorSubject<any>([]);
  roomUsers$ = this.roomUsersSubject.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private storyService: StoryService,
    private pollService: PollService
  ) {
    this.sprints$ = this.sprintService.entities$;
    this.loading$ = this.sprintService.loading$;

    this.stories$ = this.storyService.entities$;
    this.storyLoading$ = this.storyService.loading$;

    this.sprintStoriesSubject = new BehaviorSubject<any>([]);
    this.sprintStories$ = this.sprintStoriesSubject.asObservable();
  }

  ngOnInit() {
    this.isPolled = false;
    this.sprintService.getAll().subscribe(sprint => {
      if (sprint.length > 0) this.allSprints.push(sprint)
    });

    this.storyService.getAll();
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

    /**
     * To get the user votes
     */
    this.pollService.receiveVote()
      .subscribe(user => {
        this.roomUsersVote = user;
      })
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

  get storyname() {
    return this.postStoryForm.get('storyname') as FormControl;
  }

  post(value) {
    this.isPolled = true;
    this.roomUsersSubject.next(this.roomUsers[this.selectedSprint]); // to reset the vote to 0
    this.pollService.sendMessage(value.storyname, 'host', value.sprint.squad.accessCode);
  }

  flipCard() {
    console.log('Inside Flip');
    if (this.selectedSprint) this.roomUsersSubject.next(this.roomUsersVote[this.selectedSprint]);

    this.average = Array.from(this.roomUsersVote[this.selectedSprint].reduce(
      (acc, obj) => Object.keys(obj).reduce(
        // tslint:disable-next-line: no-shadowed-variable
        (acc, key) => typeof obj[key] === 'number'
          ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
          : acc,
        acc),
      new Map())).reduce(
        (acc, [name, values]) =>
          Object.assign(acc, { [name]: Math.ceil(values.reduce((a, b) => a + b) / values.length) }),
        {}
      );
  }

  public save() {
    const storyObject = {
      storyname: this.storyname.value as string,
      sprint: this.sprintName as string,
      dev: this.average.Developer as number,
      qa: this.average['Quality Analyst'] as number,
      ba: this.average['Business Analyst'] as number,
      storyPoints: this.roomUsersVote[this.selectedSprint]
    };
    this.storyService.add(storyObject);
    this.average = [];

  }

  private getFilteredValue(control: FormControl) {
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
    const newLocal = 'squadname';
    return sprint && sprint.sprintname ? `${sprint.sprintname} - ${sprint.squad[newLocal]}` : '';
  }

  sprintChange(value) {
    this.storyname.reset();
    this.selectedSprint = value.squad.accessCode;
    this.sprintName = value._id;
    console.log('Sprint Name, ' + this.sprintName);
    this.roomUsersSubject.next(this.roomUsers[this.selectedSprint]);
    this.sprintStories$ = this.getStoriesBySprint(this.sprintName);
    this.average = [];

  }

  getStoriesBySprint(sprintName) {
    return this.stories$.pipe(
      map(stories => stories.filter(story => story.sprint === sprintName)),
      filter(stories => stories && stories.length > 0)
    )
  }

}
