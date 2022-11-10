import {IPersonWFields, IDPerson} from './download';
import {IField} from './upload';

export interface ICtx {
  userWField: IPersonWFields;
  authenticate: (user: IPersonWFields) => void;
  updateFields: (ProfessionalFields: IField[]) => void;
  updatePerson: (dPerson: IDPerson) => void;
  logout: () => void;
}
