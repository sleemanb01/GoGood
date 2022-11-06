import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {AuthContext} from '../hooks/userCtx';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Feed} from './mainScreens/Feed';
import {MyMissions} from './mainScreens/MyMissions';
import {useTranslation} from 'react-i18next';
import {ILocation} from '../interfaces/ILocation';
import {getLocation} from '../util/location';
import {MyRequests} from './mainScreens/MyRequests';

import {mainStyles} from '../styles/STYLES';
import {LoadingScreen} from './utilScreens/LoadingScreen';

export function Main() {
  const [position, setPosition] = useState<ILocation | null | undefined>(
    undefined,
  );
  const {t} = useTranslation();
  const Tab = createMaterialTopTabNavigator();
  const authCtx = useContext(AuthContext);
  const user = authCtx.userWField;

  useEffect(() => {
    (async () => {
      if (!position) {
        await getLocation(setPosition);
      }
    })();
  }, []);

  if (position === undefined) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>
      <View style={mainStyles.mainContainer}>
        <Tab.Navigator>
          <Tab.Screen
            name={t('feed')}
            children={() => <Feed user={user} currPosition={position} />}
          />
          {authCtx.userWField.dPerson?.person.isAngel ? (
            <Tab.Screen
              name={t('myMissions')}
              children={() => (
                <MyMissions user={user} currPosition={position} />
              )}
            />
          ) : (
            <Tab.Screen
              name={t('myRequests')}
              children={() => (
                <MyRequests user={user} currPosition={position} />
              )}
            />
          )}
        </Tab.Navigator>
      </View>
    </React.Fragment>
  );
}
