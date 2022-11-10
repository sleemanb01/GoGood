import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {App} from '../../../App';
import {About} from '../../screens/About';
import {Categories} from '../../screens/authScreens/Categories';
import {Login} from '../../screens/authScreens/Login';
import {WhatRYou} from '../../screens/authScreens/WhatRYou';
import {Contact} from '../../screens/Contact';
import {Main} from '../../screens/Main';
import {MyMissions} from '../../screens/mainScreens/MyMissions';
import {NewPost} from '../../screens/mainScreens/NewPost';
import {Menu} from '../../screens/profileScreens/Menu';
import {Profile} from '../../screens/profileScreens/Profile';
import {ErrorScreen} from '../../screens/utilScreens/ErrorScreen';
import {LoadingScreen} from '../../screens/utilScreens/LoadingScreen';
import {headerStyle} from '../../styles/STYLES';
import {RootStackParamList} from '../../types/RootStackParamList';
import {MenuButton} from '../Buttons/MenuButton';
import {NotificationButton} from '../Buttons/NotificationButton';
import {EditProfile} from '../Profile/EditProfile';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function UserAuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export function WhatRUStack() {
  return (
    <Stack.Navigator initialRouteName="WhatRYou">
      <Stack.Screen
        name="WhatRYou"
        component={WhatRYou}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export function ChooseStack() {
  return (
    <Stack.Navigator initialRouteName="WhatRYou">
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export function AuthenticatedStack() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: headerStyle.headerStyle,
        headerTintColor: headerStyle.headerTintColor,
        headerTitleAlign: 'center',
        headerRight: () => <MenuButton />,
      }}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTitle: t('main'),
          headerLeft: () => <NotificationButton />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: t('profile'),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: t('EditProfile'),
        }}
      />
      <Stack.Screen
        name="App"
        component={App}
        options={{
          headerShown: false,
          headerTitle: t('App'),
        }}
      />
      <Stack.Screen
        name="MyMissions"
        component={MyMissions}
        options={{
          headerTitle: t('MyMissions'),
        }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerTitle: t('menu'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          headerTitle: t('contact'),
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerTitle: t('about'),
        }}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          headerTitle: t('addRequest'),
        }}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
