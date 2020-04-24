import { Injectable } from '@angular/core';
import { Sprint } from '../entities/sprint';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from 'ngrx-data';
import { Story } from '../entities/story';

@Injectable({
  providedIn: 'root'
})
export class StoryService extends EntityCollectionServiceBase<Story> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Story', serviceElementsFactory);
  }
}
