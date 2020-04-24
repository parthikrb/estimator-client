import { EntityMetadataMap, DefaultDataServiceConfig } from 'ngrx-data';


const entityMetadata: EntityMetadataMap = {
  User: {
    selectId: User => User._id
  },
  Squad: {
    selectId: Squad => Squad._id
  },
  Story: {
    selectId: Story => Story._id
  },
  Sprint: {
    selectId: Sprint => Sprint._id
  }
};

// because the plural of "hero" is not "heros"
const pluralNames = { Story: 'Stories', User: 'Users', Sprint: 'Sprints', Squad: 'Squads' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000',
  timeout: 1000 * 60
};
