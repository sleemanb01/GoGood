import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext, AuthContextProvider} from './src/hooks/userCtx';
import useAsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthenticatedStack,
  ChooseStack,
  UserAuthStack,
  WhatRUStack,
} from './src/components/util/NavStacks';
import {LoadingScreen} from './src/screens/utilScreens/LoadingScreen';
import {handleLang} from './src/util/handleLang';
import {IPersonWFields} from './src/interfaces/download';

function Navigation({user}: {user: IPersonWFields}) {
  return (
    <NavigationContainer independent={true}>
      {conditionalRender(user)}
    </NavigationContainer>
  );
}

function conditionalRender(user: IPersonWFields) {
  if (user.dPerson === null) {
    return <UserAuthStack />;
  } else {
    if (user.dPerson.person.isAngel === null) {
      return <WhatRUStack />;
    } else if (user.dPerson.person.isAngel && user.fields.length === 0) {
      return <ChooseStack />;
    } else {
      return <AuthenticatedStack />;
    }
  }
}
function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const storedUsr = await useAsyncStorage.getItem('user');

      if (storedUsr) {
        authCtx.authenticate(JSON.parse(storedUsr));
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    <LoadingScreen />;
  }
  return <Navigation user={authCtx.userWField} />;
}

export const App = () => {
  useLayoutEffect(() => {
    handleLang();
  }, []);

  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
};
