import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from 'ngrx-data';
import { Squad } from '../entities/squad';

@Injectable({
  providedIn: 'root'
})
export class SquadService extends EntityCollectionServiceBase<Squad> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Squad', serviceElementsFactory);
  }
}
