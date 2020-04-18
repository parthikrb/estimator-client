import { Component, OnInit } from '@angular/core';
import { BottomSheetHelper } from '../../../helpers/bottomSheetHelper';
import { AddSquadPageComponent } from '../add-squad-page/add-squad-page.component';
import { SquadService } from '../../../services/squad.service';
import { Observable } from 'rxjs';
import { Squad } from 'src/app/entities/squad';

@Component({
  selector: 'app-squads-page',
  templateUrl: './squads-page.component.html',
  styleUrls: ['./squads-page.component.scss']
})
export class SquadsPageComponent implements OnInit {

  squads$: Observable<Squad[]>;
  loading$: Observable<boolean>;

  constructor(
    private bottomSheet: BottomSheetHelper,
    private squadService: SquadService,
  ) {
    this.squads$ = this.squadService.entities$;
    this.loading$ = this.squadService.loading$;
    this.squadService.getAll();
  }

  ngOnInit() {
  }

  openAddSquad() {
    this.bottomSheet.openBottomSheet(AddSquadPageComponent);
  }

  public notify(payload: string) {
    // Might want to notify the user that something has been pushed to the clipboard
    console.log(`'${payload}' has been copied to clipboard`);
  }
}
