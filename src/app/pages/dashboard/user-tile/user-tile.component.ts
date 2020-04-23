import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {

  constructor() { }

  @Input() username: string;
  @Input() role: string;
  @Input() estimation: number;


  ngOnInit(): void {
  }

}
