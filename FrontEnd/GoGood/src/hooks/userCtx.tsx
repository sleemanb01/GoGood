import React, {createContext, useState} from 'react';
import {ICtx} from '../interfaces/ICtx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IPersonWFields, IDPerson} from '../interfaces/download';
import {IField, IProfessionalField} from '../interfaces/upload';

const initialValue = {
  dPerson: null,
  fields: [],
};

export const AuthContext = createContext<ICtx>({
  isAuthenticated: false,
  userWField: initialValue,
  authenticate: () => {},
  updateFields: () => {},
  updatePerson: () => {},
  logout: () => {},
});

export function AuthContextProvider({children}: {children: JSX.Element}) {
  const [auth, setAuth] = useState<IPersonWFields>(initialValue);

  async function authenticate(user: IPersonWFields) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setAuth(user);
  }

  async function updateFields(fields: IField[]) {
    let tmp: IPersonWFields = {
      dPerson: auth.dPerson,
      fields: fields,
    };
    await AsyncStorage.setItem('user', JSON.stringify(tmp));
    setAuth(tmp);
  }

  async function updatePerson(dPerson: IDPerson) {
    let tmp: IPersonWFields = {
      dPerson: dPerson,
      fields: auth.fields,
    };
    await AsyncStorage.setItem('user', JSON.stringify(tmp));

    setAuth(tmp);
  }

  async function logout() {
    await AsyncStorage.removeItem('user');
    setAuth(initialValue);
  }

  const value: ICtx = {
    isAuthenticated: !!auth.dPerson && !!auth.dPerson.person.isAngel,
    userWField: auth,
    authenticate: authenticate,
    updateFields: updateFields,
    updatePerson: updatePerson,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
