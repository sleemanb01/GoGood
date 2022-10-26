import {IField} from '../Upload/IField';
import {IDPerson} from './IDPerson';
import {IDPost} from './IDPost';
import {IPostPropose} from '../Upload/IPostPropose';
import {IPostGallery} from '../Upload/IPostGallery';

export interface IPostWData {
  dPosts: IDPost[];
  professionalProposers?: IDPerson[];
  postProposes?: IPostPropose[];
  postGallery?: IPostGallery[];
}
