import {IPersonWFields} from '../interfaces/download';
import {ICtx} from '../interfaces/ICtx';
import {ILocation} from '../interfaces/ILocation';
import {IField} from '../interfaces/upload';

export type RootStackParamList = {
  Login: undefined;
  WhatRYou: undefined;
  Categories: undefined;
  Main: undefined;
  ErrorScreen: undefined;
  LoadingScreen: undefined;
  About: undefined;
  Contact: undefined;
  Menu: undefined;
  EditProfile: undefined;
  App: undefined;
  Feed:
    | {
        currPosition: ILocation | null | undefined;
        user: IPersonWFields;
      }
    | undefined;
  MyMissions:
    | {
        currPosition: ILocation | null | undefined;
        user: IPersonWFields | undefined;
      }
    | undefined;
  MyRequests:
    | {
        currPosition: ILocation | null | undefined;
        user: IPersonWFields;
      }
    | undefined;
  NewPost: {
    user: IPersonWFields | undefined;
    position: ILocation | null | undefined;
  };
  Profile:
    | {
        user: IPersonWFields;
      }
    | undefined;
};
