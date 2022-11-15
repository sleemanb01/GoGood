import {IDPerson, IDPostGallery} from './download';
import {IPostPropose, IPost, IProfessionalReview} from './upload';

export interface IDisplayPost {
  post: IPost;
  professionalProposers: IDPerson[];
  postProposes: IPostPropose[];
  postGallery: IDPostGallery[];
}

export interface IDisplayPerson {
  dPerson: IDPerson;
  professionalReviews: IProfessionalReview[];
}
