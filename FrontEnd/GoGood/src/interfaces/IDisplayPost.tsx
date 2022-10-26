import {IField} from './Upload/IField';
import {IDPerson} from './Download/IDPerson';
import {IDPost} from './Download/IDPost';
import {IPostPropose} from './Upload/IPostPropose';
import {IPostGallery} from './Upload/IPostGallery';

export interface IDisplayPost {
  dPost: IDPost;
  professionalProposers?: IDPerson[];
  postProposes?: IPostPropose[];
  postGallery?: IPostGallery[];
}
