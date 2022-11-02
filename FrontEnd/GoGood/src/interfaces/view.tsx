import {IDPerson} from './download';
import {IPostPropose, IPostGallery, IPost, IProfessionalReview} from './upload';

export interface IDisplayPost {
  post: IPost;
  professionalProposers?: IDPerson[];
  postProposes?: IPostPropose[];
  postGallery?: IPostGallery[];
}

export interface IDisplayPerson {
  dPerson: IDPerson;
  professionalReviews: IProfessionalReview[];
}
