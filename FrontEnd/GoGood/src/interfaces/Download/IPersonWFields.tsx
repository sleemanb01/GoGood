import {IField} from '../Upload/IField';
import {IPerson} from '../Upload/IPerson';
import {IDPerson} from './IDPerson';

export interface IPersonWFields {
  dPerson: IDPerson | null;
  professionalFields: IField[];
}
