import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Story } from '../../../entities/story';

@Component({
  selector: 'app-sprint-story-details',
  templateUrl: './sprint-story-details.component.html',
  styleUrls: ['./sprint-story-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SprintStoryDetailsComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() dataSource: Story[];

  displayedColumns: string[] = ['storyname', 'dev', 'qa', 'ba'];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`Changes ${JSON.stringify(changes)}`);
  }



}
