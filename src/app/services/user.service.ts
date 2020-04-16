import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityCollectionServiceBase<User> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }
}
