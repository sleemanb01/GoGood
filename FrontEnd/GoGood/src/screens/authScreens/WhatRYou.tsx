import React, {useContext, useEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {CustGradient} from '../../components/util/CustGradient';
import {_FONTS} from '../../constants/_FONTS';
import {WhoRYouStyles} from '../../constants/STYLES';
import {_BUTTONS} from '../../constants/_BUTTONS';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../hooks/userCtx';
import {useTranslation} from 'react-i18next';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {IField} from '../../interfaces/upload';
import {updatePerson} from '../../util/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IDPerson} from '../../interfaces/download';
import {USTATUS} from '../../types/enum';
import {ErrorScreen} from '../utilScreens/ErrorScreen';
import {getFields} from '../../util/localStorage';

export function WhatRYou() {
  const {t} = useTranslation();
  const authCtx = useContext(AuthContext);
  const user = authCtx.userWField.dPerson as IDPerson;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isAngel, setIsAngel] = useState(false);
  const [fields, setFields] = useState<IField[] | null>([]);
  const [success, setSuccess] = useState<USTATUS>(0);

  useEffect(() => {
    getFields(setFields);
  }, []);

  useEffect(() => {
    if (fields && fields.length > 0) {
      (async () => {
        await AsyncStorage.setItem('fields', JSON.stringify(fields));
      })();
    }
  }, [fields]);

  if (fields === null) {
    return <ErrorScreen />;
  }

  if (success === 3) {
    navigation.navigate('ErrorScreen');
  } else if (success === 2) {
    (async () => {
      authCtx.updatePerson(updateIsAngel(user, isAngel));
    })();
  }

  const btnPressHandler = (value: boolean) => {
    setIsAngel(value);
  };

  const submitHandler = async () => {
    updatePerson(updateIsAngel(user, isAngel), setSuccess);
  };

  return (
    <CustGradient>
      <React.Fragment>
        <View style={WhoRYouStyles.headerContainer}>
          <Image source={require('../../images/Moster_Hi.png')} />
          <Text style={_FONTS.custHebrewBold}>
            {t('hi')} {authCtx.userWField.dPerson?.person.uname}{' '}
            {t('niceToMeet')}
          </Text>
          <Text style={_FONTS.custHebrew}>{t('cameForHelp')}</Text>
        </View>
        <View style={WhoRYouStyles.mainContainer}>
          <Pressable
            onPress={() => btnPressHandler(true)}
            style={isAngel ? _BUTTONS.activeBtn : _BUTTONS.unActiveBtn}>
            <Text style={_FONTS.btnBlackText}>{t('helper')}</Text>
          </Pressable>
          <Pressable
            onPress={() => btnPressHandler(false)}
            style={isAngel ? _BUTTONS.unActiveBtn : _BUTTONS.activeBtn}>
            <Text style={_FONTS.btnBlackText}>{t('help')}</Text>
          </Pressable>
        </View>
        <View style={WhoRYouStyles.footerContainer}>
          <PrimaryButton text={t('goToHome')} onPress={submitHandler} />
        </View>
      </React.Fragment>
    </CustGradient>
  );
}

function updateIsAngel(user: IDPerson, isAngel: boolean): IDPerson {
  return {person: {...user.person, isAngel}, pImage: user.pImage};
}
