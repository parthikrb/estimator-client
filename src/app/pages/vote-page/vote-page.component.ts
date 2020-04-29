import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  fibonacciValue: number[];

  private storyNumberSubject = new BehaviorSubject<string>('');
  public storyNumber$ = this.storyNumberSubject.asObservable();

  // story = [];

  difficultyLevel = ['Easier than Easy', 'Easy', 'Normal', 'Medium', 'Standard', 'Average',
    'Intermediate', 'Hard', 'Expert', 'Difficult'];

  constructor(
    private pollService: PollService,
  ) {
  }

  ngOnInit() {
    this.fibonacciValue = this.fibonacciSeries(9);

    this.pollService.getMessage()
      .subscribe(
        data => {
          console.log('data, ', data);
          this.storyNumberSubject.next(data.text);
        }
      )
  }

  fibonacciSeries(limit: number) {
    const arr = [1, 2];
    for (let i = 2; i < limit + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  }

  userVote(value: number) {
    this.pollService.sendVote(value);
  }

}
