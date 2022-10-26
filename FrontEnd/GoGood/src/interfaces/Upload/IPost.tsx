import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import {IField} from './IField';

export interface IPost {
  id?: number;
  postTitle: string;
  postDescription: string;
  postDate: Date;
  personId: number;
  fieldId: number;
  postLat?: Float;
  postLng?: Float;
  proffessionalId?: number;
  postStatus?: number;
}
