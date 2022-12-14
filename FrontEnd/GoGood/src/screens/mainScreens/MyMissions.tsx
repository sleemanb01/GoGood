import React from 'react';
import {ILocation} from '../../interfaces/ILocation';
import Posts from '../../components/Posts';
import {Sort} from '../../components/util/Sort';
import {IPersonWFields} from '../../interfaces/download';

export function MyMissions({
  currPosition,
  user,
}: {
  currPosition: ILocation | null | undefined;
  user: IPersonWFields;
}) {
  let params = '';
  let tmp = user.dPerson;
  if (tmp) {
    params = tmp.person.id ? tmp.person.id.toString() : '';
  }

  return (
    <React.Fragment>
      <Sort />
      <Posts
        params={params}
        position={currPosition}
        controller={'Posts/getPostsByPro/'}
      />
    </React.Fragment>
  );
}
