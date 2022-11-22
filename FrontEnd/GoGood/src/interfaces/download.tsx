import {
  IField,
  IPerson,
  IPost,
  IPostPropose,
  IProfessionalReview,
} from './upload';

export interface IDPerson {
  person: IPerson;
  pImage: string;
}

export interface IDPostGallery {
  id: number;
  postId: number;
  dGallery?: string;
}

export interface IPostWGallery {
  post: IPost;
  dPostGallery: IDPostGallery[];
}

export interface ReviewWithPerson {
  dPersons: IDPerson[];
  professionalReviews: IProfessionalReview[];
}

export interface IPersonWFields {
  dPerson: IDPerson | null;
  fields: IField[];
}

export interface IPostsWData {
  posts: IPost[];
  professionalProposers: IDPerson[];
  postProposes: IPostPropose[];
  dPostGallery: IDPostGallery[];
}
