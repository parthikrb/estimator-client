import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  fibonacciValue: number[];

  difficultyLevel = ['Easier than Easy', 'Easy', 'Normal', 'Medium', 'Standard', 'Average',
  'Intermediate', 'Hard', 'Expert', 'Difficult'];

  constructor() { }

  ngOnInit() {
    this.fibonacciValue = this.fibonacciSeries(9);
    console.log('[Fib Value], ', this.fibonacciValue);
  }

  fibonacciSeries(limit: number) {
    const arr = [1, 2];
    for (let i = 2; i < limit + 1; i++ ) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  }

}
