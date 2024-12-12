import { Injectable } from '@nestjs/common';
import {  ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { PersonCreatedEvent } from '../events/person-created.event';


@Injectable()
export class PersonSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>) => {
    return events$
      .pipe(
        ofType(PersonCreatedEvent),
        delay(1000),
        map(event => {
          console.log(clc.redBright('Inside [PersonSagas] Saga'));
        
        }),
      );
  }
}
