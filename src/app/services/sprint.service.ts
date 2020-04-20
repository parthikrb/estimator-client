import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from 'ngrx-data';
import { Sprint } from '../entities/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService extends EntityCollectionServiceBase<Sprint> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Sprint', serviceElementsFactory);
  }
}
