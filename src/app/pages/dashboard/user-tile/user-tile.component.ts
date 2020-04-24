import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTileComponent implements OnInit {

  constructor() { }

  @Input() username: string;
  @Input() role: string;
  @Input() estimation: number;


  ngOnInit(): void {
  }

}
