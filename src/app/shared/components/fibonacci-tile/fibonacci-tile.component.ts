import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fibonacci-tile',
  templateUrl: './fibonacci-tile.component.html',
  styleUrls: ['./fibonacci-tile.component.scss']
})
export class FibonacciTileComponent implements OnInit {

  toggle = true;

  @Input() value: number;

  @Input() description: string;

  @Output() votedValue = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  cardSelected(value) {
    console.log('Card clicked, ', value);
    this.toggle = !this.toggle;
    this.votedValue.emit(value);
  }


}
