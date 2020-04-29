import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fibonacci-tile',
  templateUrl: './fibonacci-tile.component.html',
  styleUrls: ['./fibonacci-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FibonacciTileComponent implements OnInit, OnChanges {

  toggle = true;

  @Input() value: number;

  @Input() description: string;

  @Input() storyNumber: number;

  @Output() votedValue = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.storyNumber.currentValue !== changes.storyNumber.previousValue) {
      this.toggle = true;
    }
  }

  cardSelected(value) {
    this.toggle = true;
    this.toggle = !this.toggle;
    this.votedValue.emit(value);
  }


}
