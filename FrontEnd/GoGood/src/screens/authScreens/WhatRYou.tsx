import React, {useContext, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {CustGradient} from '../../components/util/CustGradient';
import {_FONTS} from '../../styles/_FONTS';
import {WhoRYouStyles} from '../../styles/STYLES';
import {_BUTTONS} from '../../styles/_BUTTONS';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../hooks/userCtx';
import {useTranslation} from 'react-i18next';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {postProfessionalFields} from '../../util/axios';

export function WhatRYou() {
  const {t} = useTranslation();
  const authCtx = useContext(AuthContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isAngel, setIsAngel] = useState(false);

  const btnPressHandler = (isAngel: boolean) => {
    setIsAngel(isAngel);
  };

  const submitHandler = () => {
    if (isAngel) {
      navigation.navigate('Categories');
    } else {
      authCtx.updateFields([{id: 1, fieldName: 'none'}]);
    }
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
