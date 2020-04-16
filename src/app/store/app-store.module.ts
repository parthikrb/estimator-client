import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { NgrxDataModule, DefaultDataServiceConfig } from 'ngrx-data';
import { entityConfig, defaultDataServiceConfig } from './entity-metadata';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    NgrxDataModule.forRoot(entityConfig),
  ],
  providers: [{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }]
})
export class AppStoreModule { }
