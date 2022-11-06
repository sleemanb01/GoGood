import {Double} from 'react-native/Libraries/Types/CodegenTypes';

export interface IField {
  fieldName: string;
  id: number;
}

export interface IPerson {
  id?: number;
  uname: string;
  phone: string;
  isAngel: boolean | null;
}

export interface IPost {
  id?: number;
  postTitle: string;
  postDescription: string;
  postDate: Date;
  personId: number;
  fieldId: number;
  postLat?: Double;
  postLng?: Double;
  proffessionalId?: number;
  postStatus?: number;
}

// export interface IPostGallery {
//   id?: number;
//   postId?: number;
//   gallery?: string[];
// }

export interface IPostPropose {
  id?: number;
  proffessionalId: number;
  postId: number;
}

export interface IProfessionalField {
  id?: number;
  personId: number;
  fieldId: number;
}

export interface IProfessionalReview {
  id?: number;
  professionalId: number;
  reviewer: number;
  reviewDate: Date;
  review: string;
}
