import React, {createContext, useState} from 'react';
import {ICtx} from '../interfaces/ICtx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IPersonWFields, IDPerson} from '../interfaces/download';
import {IField, IProfessionalField} from '../interfaces/upload';

const initialValue = {
  dPerson: null,
  professionalFields: [],
};

export const AuthContext = createContext<ICtx>({
  isAuthenticated: false,
  userWField: initialValue,
  authenticate: () => {},
  updateFields: () => {},
  updatePerson: () => {},
  logout: () => {},
});

export function AuthContextProvider({children}: {children: any}) {
  const [auth, setAuth] = useState<IPersonWFields>(initialValue);

  async function authenticate(user: IPersonWFields) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setAuth(user);
  }

  async function updateFields(fields: IField[]) {
    let tmp: IPersonWFields = {
      dPerson: auth.dPerson,
      professionalFields: fields,
    };
    await AsyncStorage.setItem('user', JSON.stringify(tmp));
    setAuth(tmp);
  }

  async function updatePerson(dPerson: IDPerson) {
    let tmp: IPersonWFields = {
      dPerson: dPerson,
      professionalFields: auth.professionalFields,
    };
    await AsyncStorage.setItem('user', JSON.stringify(tmp));
    // console.log(dPerson.pImage);

    setAuth(tmp);
  }

  async function logout() {
    await AsyncStorage.removeItem('user');
    setAuth(initialValue);
  }

  const value: ICtx = {
    isAuthenticated: !!auth.dPerson && auth.professionalFields.length > 0,
    userWField: auth,
    authenticate: authenticate,
    updateFields: updateFields,
    updatePerson: updatePerson,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
