import {
  IField,
  IPerson,
  IPost,
  IPostGallery,
  IPostPropose,
  IProfessionalField,
  IProfessionalReview,
} from './upload';

export interface IDPerson {
  person: IPerson;
  pImage: ArrayBuffer | null;
}

export interface IPostWGallery {
  post: IPost;
  postGallery?: IPostGallery[];
}

export interface ReviewWithPerson {
  dPersons: IDPerson[];
  professionalReviews: IProfessionalReview[];
}

export interface IPersonWFields {
  dPerson: IDPerson | null;
  professionalFields: IField[];
}

export interface IPostWData {
  posts: IPost[];
  professionalProposers?: IDPerson[];
  postProposes?: IPostPropose[];
  postGallery?: IPostGallery[];
}
