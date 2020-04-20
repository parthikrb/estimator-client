import { Component, OnInit } from '@angular/core';
import { BottomSheetHelper } from '../../../helpers/bottomSheetHelper';
import { AddSquadPageComponent } from '../add-squad-page/add-squad-page.component';
import { SquadService } from '../../../services/squad.service';
import { Observable } from 'rxjs';
import { Squad } from 'src/app/entities/squad';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-squads-page',
  templateUrl: './squads-page.component.html',
  styleUrls: ['./squads-page.component.scss']
})
export class SquadsPageComponent implements OnInit {

  squads$: Observable<Squad[]>;
  loading$: Observable<boolean>;

  users$: Observable<User[]>;

  bottomSheetConfig = {
    panelClass: 'bottom-sheet',
    data: { users: this.userService.entities$ }
  }

  constructor(
    private bottomSheet: BottomSheetHelper,
    private squadService: SquadService,
    private userService: UserService
  ) {
    this.users$ = this.userService.entities$;
    this.squads$ = this.squadService.entities$;
    this.loading$ = this.squadService.loading$;
    this.userService.getAll();

  }

  ngOnInit() {
    this.squadService.getAll();
  }

  openAddSquad() {
    // this.bottomSheet.openBottomSheet(AddSquadPageComponent);
    this.bottomSheet.open(AddSquadPageComponent, this.bottomSheetConfig);
  }

  public notify(payload: string) {
    // Might want to notify the user that something has been pushed to the clipboard
    console.log(`'${payload}' has been copied to clipboard`);
  }
}
