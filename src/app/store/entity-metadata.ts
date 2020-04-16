import { EntityMetadataMap, DefaultDataServiceConfig } from 'ngrx-data';

const entityMetadata: EntityMetadataMap = {
  User: {},
  Squad: {},
  Story: {},
  Sprint: {}
};

// because the plural of "hero" is not "heros"
const pluralNames = { Story: 'Stories', User: 'Users', Sprint: 'Sprints' , Squad: 'Squads'};

export const entityConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000',
  timeout: 1000 * 60
};
