import React from 'react';
import {ILocation} from '../../interfaces/ILocation';
import Posts from '../../components/Posts';
import {Sort} from '../../components/util/Sort';
import {IPersonWFields} from '../../interfaces/download';
import {IField} from '../../interfaces/upload';

export function Feed({
  currPosition,
  user,
}: {
  currPosition: ILocation | null | undefined;
  user: IPersonWFields;
}) {
  let params: string = prepareDataByFields(user.fields, user);

  return (
    <React.Fragment>
      <Sort />
      <Posts
        params={params}
        position={currPosition}
        controller={'Posts/getPostsByFields/'}
      />
    </React.Fragment>
  );
}

const prepareDataByFields = (
  fields: IField[],
  user: IPersonWFields,
): string => {
  let arr: number[] = [];

  if (!user.dPerson?.person.isAngel) {
    return '0';
  }

  fields.map((curr: IField) => {
    arr = [...arr, curr.id];
  });

  let dataString = '';
  dataString += '0,';
  arr.map((curr: number) => {
    dataString += curr + ',';
  });

  dataString.slice(0, -1);

  return dataString;
};
