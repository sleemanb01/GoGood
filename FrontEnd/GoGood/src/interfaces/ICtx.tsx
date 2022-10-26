import {IField} from './Upload/IField';
import {IPerson} from './Upload/IPerson';
import {IPersonWFields} from './Download/IPersonWFields';
import {IDPerson} from './Download/IDPerson';

export interface ICtx {
  isAuthenticated: boolean;
  userWField: IPersonWFields;
  authenticate: (user: IPersonWFields) => void;
  updateFields: (fields: IField[]) => void;
  updatePerson: (dPerson: IDPerson) => void;
  logout: () => void;
}
