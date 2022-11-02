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
  let params: string = prepareDataByFields(user.professionalFields);

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

const prepareDataByFields = (fields: IField[]): string => {
  let arr: number[] = [];

  fields.map((curr: IField) => {
    arr = [...arr, curr.id];
  });

  let dataString = '';
  let isGeneral = false;
  arr.map((curr: number) => {
    dataString += curr + ',';
    if (curr === 0) {
      isGeneral = true;
    }
  });

  if (!isGeneral) {
    dataString += '0';
  } else {
    dataString.slice(0, -1);
  }

  return dataString;
};
