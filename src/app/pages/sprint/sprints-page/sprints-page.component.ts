import { Component, OnInit } from '@angular/core';
import { SquadService } from '../../../services/squad.service';
import { Observable } from 'rxjs';
import { Squad } from 'src/app/entities/squad';
import { Sprint } from 'src/app/entities/sprint';
import { SprintService } from '../../../services/sprint.service';
import { BottomSheetHelper } from '../../../helpers/bottomSheetHelper';
import { AddSprintPageComponent } from '../add-sprint-page/add-sprint-page.component';

@Component({
  selector: 'app-storys-page',
  templateUrl: './sprints-page.component.html',
  styleUrls: ['./sprints-page.component.scss']
})
export class SprintsPageComponent implements OnInit {

  squads$: Observable<Squad[]>
  loading$: Observable<boolean>;
  sprints$: Observable<Sprint[]>;

  bottomSheetConfig = {
    panelClass: 'bottom-sheet',
    data: { squads: this.squadService.entities$ }
  }

  constructor(
    private squadService: SquadService,
    private sprintService: SprintService,
    private bottomSheet: BottomSheetHelper
  ) {
    this.squads$ = this.squadService.entities$;
    this.sprints$ = this.sprintService.entities$;
    this.loading$ = this.sprintService.loading$;
    this.squadService.getAll();
  }

  ngOnInit() {
    this.sprintService.getAll();
  }

  openAddSprint() {
    this.bottomSheet.open(AddSprintPageComponent, this.bottomSheetConfig)
  }


}
