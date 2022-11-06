import {IPersonWFields, IDPerson} from './download';
import {IField, IProfessionalField} from './upload';

export interface ICtx {
  isAuthenticated: boolean;
  userWField: IPersonWFields;
  authenticate: (user: IPersonWFields) => void;
  updateFields: (ProfessionalFields: IField[]) => void;
  updatePerson: (dPerson: IDPerson) => void;
  logout: () => void;
}
