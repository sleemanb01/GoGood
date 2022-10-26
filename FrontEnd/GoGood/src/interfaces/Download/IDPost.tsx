import {Double} from 'react-native/Libraries/Types/CodegenTypes';
import {IField} from '../Upload/IField';

export interface IDPost {
  id?: number;
  postTitle: string;
  postDescription: string;
  postDate: Date;
  personId: number;
  postLat?: Double;
  postLng?: Double;
  professionalId?: number;
  postStatus?: number;
  field: IField;
}

// id?: number;
// postTitle: string;
// postDescription: string;
// postDate: Date;
// personId: number;
// fieldId: number;
// postLat?: Float;
// postLng?: Float;
// proffessionalId?: number;
// postStatus?: number;
