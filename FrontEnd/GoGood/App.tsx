import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext, AuthContextProvider} from './src/hooks/userCtx';
import useAsyncStorage from '@react-native-async-storage/async-storage';
import {ICtx} from './src/interfaces/ICtx';
import {
  AuthenticatedStack,
  FieldsAuthStack,
  UserAuthStack,
} from './src/components/util/NavStacks';
import {LoadingScreen} from './src/screens/utilScreens/LoadingScreen';
import {handleLang} from './src/util/handleLang';

function Navigation({authCtx}: {authCtx: ICtx}) {
  return (
    <NavigationContainer independent={true}>
      {conditionalRender(authCtx)}
    </NavigationContainer>
  );
}

function conditionalRender(authCtx: ICtx) {
  if (authCtx.isAuthenticated) {
    return <AuthenticatedStack />;
  } else if (authCtx.userWField.dPerson) {
    return <FieldsAuthStack />;
  } else {
    return <UserAuthStack />;
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
  return <Navigation authCtx={authCtx} />;
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
